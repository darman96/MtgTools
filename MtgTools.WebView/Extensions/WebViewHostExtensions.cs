using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using MtgTools.WebView.Hosting;
using Photino.NET;

namespace MtgTools.WebView.Extensions;

public static partial class WebViewHostExtensions
{
    extension(IHost host)
    {
        /// <summary>
        /// Starts the host on a background thread, then blocks the calling (main) thread on
        /// Photino's message loop. Returns after the window is closed and the host has stopped.
        /// </summary>
        /// <remarks>
        /// This must be called from the application's main thread. Photino's native message
        /// loop requires the main thread, so the host is started via <see cref="Task.Run"/>
        /// to keep the main thread free for <see cref="PhotinoWindow.WaitForClose"/>.
        /// </remarks>
        public async Task RunWebViewAsync(CancellationToken cancellationToken = default)
        {
            var window = host.Services.GetRequiredService<PhotinoWindow>();

            // Start the host (and all hosted services, including PhotinoWindowService)
            // on a background thread so the main thread stays free for the message loop.
            await host.StartAsync(cancellationToken);

            var logger = host.Services.GetRequiredService<ILoggerFactory>().CreateLogger("WebViewStartup");
            
            try
            {
                var startUrlProvider = host.Services.GetService<IWebViewStartUrlProvider>();
                var startUrl = startUrlProvider?.StartUrl ?? "wwwroot/index.html";
                LogLoadingWebviewStartUrlStartUrl(logger, startUrl);
                
                window.Load(startUrl);
                // Block the main thread — Photino's native message loop runs here until
                // the window is closed.
                window.WaitForClose();
            }
            catch (Exception e)
            {
                LogUnhandledExceptionRoutingMessage(logger, e);
            }
            finally
            {
                await host.StopAsync(cancellationToken);
            }
        }
    }
    
    [LoggerMessage(LogLevel.Information, "Loading WebView start URL: {StartUrl}")]
    static partial void LogLoadingWebviewStartUrlStartUrl(ILogger logger, string startUrl);
    
    [LoggerMessage(LogLevel.Error, "Unhandled exception routing message")]
    static partial void LogUnhandledExceptionRoutingMessage(ILogger logger, Exception ex);
}
