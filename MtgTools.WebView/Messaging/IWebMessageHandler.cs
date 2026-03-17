namespace MtgTools.WebView.Messaging;

/// <summary>
/// Handles messages received on a specific channel. Implement this interface for
/// request/response style handlers (commands and queries).
/// </summary>
/// <typeparam name="TRequest">The deserialized payload type for the incoming message.</typeparam>
/// <typeparam name="TResponse">The response payload type sent back to the frontend.</typeparam>
public interface IWebMessageHandler<in TRequest, TResponse>
{
    Task<TResponse> HandleAsync(TRequest request, CancellationToken cancellationToken);
}

/// <summary>
/// Handles messages received on a specific channel with no response payload.
/// The frontend still receives a response envelope (with null payload) to resolve its promise.
/// </summary>
/// <typeparam name="TRequest">The deserialized payload type for the incoming message.</typeparam>
public interface IWebMessageHandler<in TRequest>
{
    Task HandleAsync(TRequest request, CancellationToken cancellationToken);
}
