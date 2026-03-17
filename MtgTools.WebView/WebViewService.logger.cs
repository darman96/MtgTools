using Microsoft.Extensions.Logging;

// ReSharper disable once CheckNamespace
namespace MtgTools.WebView.WebView;

internal partial class WebViewService
{
    [LoggerMessage(LogLevel.Debug, "Received message from web view: {Message}")]
    static partial void LogMessageReceived(ILogger<WebViewService> logger, string message);

    [LoggerMessage(LogLevel.Error, "Unhandled exception routing message")]
    static partial void LogUnhandledExceptionRoutingMessage(ILogger<WebViewService> logger, Exception ex);
}