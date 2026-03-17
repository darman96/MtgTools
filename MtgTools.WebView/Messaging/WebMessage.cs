using System.Text.Json;
using System.Text.Json.Serialization;

namespace MtgTools.WebView.Messaging;

/// <summary>
/// Envelope for all messages exchanged between the .NET backend and the web frontend
/// over Photino's string channel.
/// </summary>
public sealed record WebMessage
{
    public required string Id { get; init; }

    [JsonConverter(typeof(JsonStringEnumConverter<WebMessageType>))]
    public required WebMessageType Type { get; init; }

    public required string Channel { get; init; }

    public JsonElement? Payload { get; init; }
}

[JsonConverter(typeof(JsonStringEnumConverter<WebMessageType>))]
public enum WebMessageType
{
    Command,
    Query,
    Event,
    Response,
    Error,
}
