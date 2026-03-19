// Lightweight Photino / WebMessage bridge for the frontend
// Provides a small API to send and receive WebMessage envelopes used by the .NET host.

type WebMessageType = "Command" | "Query" | "Event" | "Response" | "Error";

interface WebMessage {
  id: string;
  type: WebMessageType;
  channel: string;
  payload?: any;
}

const pending = new Map<string, { resolve: (v: any) => void; reject: (e: any) => void }>();
const eventHandlers = new Map<string, Set<(payload: any) => void>>();
const requestHandlers = new Map<string, (payload: any) => Promise<any> | any>();

function makeId(): string {
  try {
    // Prefer the native UUID if available
    if (typeof crypto !== "undefined" && typeof (crypto as any).randomUUID === "function") {
      return (crypto as any).randomUUID();
    }
  } catch {}
  return Date.now().toString(36) + "-" + Math.random().toString(36).slice(2);
}

function sendRaw(message: WebMessage) {
  const json = JSON.stringify(message);
  try {
    if (typeof (window as any).external?.sendMessage === "function") {
      (window as any).external.sendMessage(json);
      return;
    }
  } catch (err) {
    console.warn("photino: window.external.sendMessage threw", err);
  }
  // No Photino host attached - log for development
  // eslint-disable-next-line no-console
  console.warn("photino: no window.external.sendMessage available; message dropped:", message);
}

export function sendEvent(channel: string, payload?: any) {
  sendRaw({ id: makeId(), type: "Event", channel, payload });
}

export function sendCommand(channel: string, payload?: any) {
  sendRaw({ id: makeId(), type: "Command", channel, payload });
}

export function sendQuery(channel: string, payload?: any, timeoutMs?: number): Promise<any> {
  const id = makeId();
  const message: WebMessage = { id, type: "Query", channel, payload };
  return new Promise((resolve, reject) => {
    pending.set(id, { resolve, reject });
    sendRaw(message);
    if (timeoutMs && timeoutMs > 0) {
      setTimeout(() => {
        if (pending.has(id)) {
          pending.delete(id);
          reject(new Error("photino: query timed out"));
        }
      }, timeoutMs);
    }
  });
}

export function onEvent(channel: string, handler: (payload: any) => void) {
  let set = eventHandlers.get(channel);
  if (!set) {
    set = new Set();
    eventHandlers.set(channel, set);
  }
  set.add(handler);
  return () => offEvent(channel, handler);
}

export function offEvent(channel: string, handler: (payload: any) => void) {
  const set = eventHandlers.get(channel);
  if (!set) return;
  set.delete(handler);
  if (set.size === 0) eventHandlers.delete(channel);
}

export function registerRequestHandler(
  channel: string,
  handler: (payload: any) => Promise<any> | any
) {
  requestHandlers.set(channel, handler);
  return () => requestHandlers.delete(channel);
}

function handleIncoming(message: WebMessage) {
  try {
    switch (message.type) {
      case "Event": {
        const set = eventHandlers.get(message.channel);
        if (!set) return;
        set.forEach((h) => {
          try {
            h(message.payload);
          } catch (err) {
            console.error("photino: event handler error", err);
          }
        });
        return;
      }
      case "Response": {
        const p = pending.get(message.id);
        if (!p) {
          console.warn("photino: unmatched response", message);
          return;
        }
        pending.delete(message.id);
        p.resolve(message.payload);
        return;
      }
      case "Error": {
        const p = pending.get(message.id);
        if (p) {
          pending.delete(message.id);
          const err = message.payload?.message ?? message.payload ?? "unknown error";
          p.reject(new Error(String(err)));
        } else {
          console.error("photino: remote error (no pending request)", message);
        }
        return;
      }
      case "Command":
      case "Query": {
        const handler = requestHandlers.get(message.channel);
        if (!handler) {
          // If it's a Query, the sender expects a response — reply with an Error
          if (message.type === "Query") {
            sendRaw({ id: message.id, type: "Error", channel: message.channel, payload: { message: `No handler for channel ${message.channel}` } });
          }
          return;
        }
        (async () => {
          try {
            const result = await handler(message.payload);
            if (message.type === "Query") {
              sendRaw({ id: message.id, type: "Response", channel: message.channel, payload: result });
            }
          } catch (err: any) {
            sendRaw({ id: message.id, type: "Error", channel: message.channel, payload: { message: err?.message ?? String(err) } });
          }
        })();
        return;
      }
      default:
        console.warn("photino: unknown message type", message);
    }
  } catch (err) {
    console.error("photino: failed to handle incoming message", err);
  }
}

export function initWebMessage() {
  // Ensure we only initialize once
  if ((window as any).__photinoBridgeInitialized) return;
  (window as any).__photinoBridgeInitialized = true;

  // Expose a small API under `window.photino` for convenience
  (window as any).photino = (window as any).photino ?? {};
  (window as any).photino.sendEvent = sendEvent;
  (window as any).photino.sendCommand = sendCommand;
  (window as any).photino.sendQuery = sendQuery;
  (window as any).photino.onEvent = onEvent;
  (window as any).photino.registerRequestHandler = registerRequestHandler;

  // Photino will call window.external.receiveMessage(message)
  (window as any).external = (window as any).external ?? {};
  (window as any).external.receiveMessage = function (message: string) {
    try {
      const parsed = JSON.parse(message) as WebMessage;
      handleIncoming(parsed);
    } catch (err) {
      console.error("photino: invalid incoming message", err, message);
    }
  };
}

export default {
  initWebMessage,
  sendEvent,
  sendCommand,
  sendQuery,
  onEvent,
  offEvent,
  registerRequestHandler,
};

