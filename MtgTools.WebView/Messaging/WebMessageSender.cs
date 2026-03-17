using System.Text.Json;
using Microsoft.Extensions.Logging;
using Photino.NET;

namespace MtgTools.WebView.Messaging;

internal sealed class WebMessageSender(
    PhotinoWindow window,
    ILogger<WebMessageSender> logger) : IWebMessageSender
{
    private static readonly JsonSerializerOptions SerializerOptions = new()
    {
        PropertyNamingPolicy = JsonNamingPolicy.CamelCase,
        DefaultIgnoreCondition = System.Text.Json.Serialization.JsonIgnoreCondition.WhenWritingNull,
    };

    public void SendEvent<TPayload>(string channel, TPayload payload)
    {
        var message = new WebMessage
        {
            Id = Guid.NewGuid().ToString(),
            Type = WebMessageType.Event,
            Channel = channel,
            Payload = SerializePayload(payload),
        };

        Send(message);
    }

    void IWebMessageSender.SendResponse<TPayload>(string requestId, string channel, TPayload payload)
    {
        var message = new WebMessage
        {
            Id = requestId,
            Type = WebMessageType.Response,
            Channel = channel,
            Payload = SerializePayload(payload),
        };

        Send(message);
    }

    void IWebMessageSender.SendError(string requestId, string channel, string errorMessage)
    {
        var message = new WebMessage
        {
            Id = requestId,
            Type = WebMessageType.Error,
            Channel = channel,
            Payload = SerializePayload(new { message = errorMessage }),
        };

        Send(message);
    }

    private void Send(WebMessage message)
    {
        var json = JsonSerializer.Serialize(message, SerializerOptions);
        logger.LogDebug("Sending message to frontend: {Json}", json);
        window.SendWebMessage(json);
    }

    private static JsonElement? SerializePayload<T>(T payload)
    {
        if (payload is null) return null;
        var bytes = JsonSerializer.SerializeToUtf8Bytes(payload, SerializerOptions);
        return JsonDocument.Parse(bytes).RootElement.Clone();
    }
}
