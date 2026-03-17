namespace MtgTools.WebView.Messaging;

/// <summary>
/// Sends messages (events and responses) to the web frontend via Photino's string channel.
/// </summary>
public interface IWebMessageSender
{
    /// <summary>
    /// Sends a fire-and-forget event to the frontend. The <paramref name="channel"/> determines
    /// which listeners on the frontend are notified.
    /// </summary>
    void SendEvent<TPayload>(string channel, TPayload payload);

    /// <summary>
    /// Sends a response envelope back to the frontend, correlated to the original request by
    /// <paramref name="requestId"/>.
    /// </summary>
    internal void SendResponse<TPayload>(string requestId, string channel, TPayload payload);

    /// <summary>
    /// Sends an error envelope back to the frontend, correlated to the original request by
    /// <paramref name="requestId"/>.
    /// </summary>
    internal void SendError(string requestId, string channel, string message);
}
