using MtgTools.WebView.Messaging;

namespace MtgTools.App.Handlers;

public sealed class EchoHandler(IWebMessageSender sender) : IWebMessageHandler<EchoRequest, EchoResponse>
{
    public Task<EchoResponse> HandleAsync(EchoRequest request, CancellationToken cancellationToken)
    {
        sender.SendEvent("echo.happened", new EchoEvent(request.Message, DateTimeOffset.UtcNow));
        return Task.FromResult(new EchoResponse("response", request.Message));
    }
}
