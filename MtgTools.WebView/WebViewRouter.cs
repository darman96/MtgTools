using System.Collections.Frozen;
using System.Text.Json;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using MtgTools.WebView.Messaging;

namespace MtgTools.WebView;

/// <summary>
/// Routes incoming <see cref="WebMessage"/>s to the appropriate <see cref="IWebMessageHandler{TRequest,TResponse}"/>
/// based on the message's channel string.
/// </summary>
public sealed class WebViewRouter
{
    private static readonly JsonSerializerOptions DeserializerOptions = new()
    {
        PropertyNamingPolicy = JsonNamingPolicy.CamelCase,
    };

    private readonly FrozenDictionary<string, HandlerRegistration> handlers;
    private readonly IServiceProvider serviceProvider;
    private readonly IWebMessageSender sender;
    private readonly ILogger<WebViewRouter> logger;

    internal WebViewRouter(
        IEnumerable<HandlerRegistration> registrations,
        IServiceProvider serviceProvider,
        IWebMessageSender sender,
        ILogger<WebViewRouter> logger)
    {
        this.serviceProvider = serviceProvider;
        this.sender = sender;
        this.logger = logger;
        handlers = registrations.ToFrozenDictionary(r => r.Channel);
    }

    /// <summary>
    /// Deserializes the raw JSON string into a <see cref="WebMessage"/> envelope and dispatches
    /// it to the registered handler for the message's channel.
    /// </summary>
    internal async Task RouteAsync(string rawJson)
    {
        WebMessage envelope;

        try
        {
            envelope = JsonSerializer.Deserialize<WebMessage>(rawJson, DeserializerOptions)!;
        }
        catch (JsonException ex)
        {
            logger.LogError(ex, "Failed to deserialize message envelope: {Raw}", rawJson);
            return;
        }

        if (envelope is null)
        {
            logger.LogWarning("Received null message envelope");
            return;
        }

        if (!handlers.TryGetValue(envelope.Channel, out var registration))
        {
            logger.LogWarning("No handler registered for channel '{Channel}'", envelope.Channel);
            sender.SendError(envelope.Id, envelope.Channel, $"No handler registered for channel '{envelope.Channel}'");
            return;
        }

        try
        {
            await registration.InvokeAsync(serviceProvider, sender, envelope);
        }
        catch (Exception ex)
        {
            logger.LogError(ex, "Handler for channel '{Channel}' threw an exception", envelope.Channel);
            sender.SendError(envelope.Id, envelope.Channel, ex.Message);
        }
    }

    /// <summary>
    /// Describes how to resolve and invoke a handler for a specific channel.
    /// </summary>
    internal sealed record HandlerRegistration(
        string Channel,
        Type HandlerType,
        Func<IServiceProvider, IWebMessageSender, WebMessage, Task> InvokeAsync);
}