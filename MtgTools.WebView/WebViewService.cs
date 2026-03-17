using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using Photino.NET;

namespace MtgTools.WebView.WebView;

/// <summary>
/// An <see cref="IHostedService"/> that ties <see cref="PhotinoWindow"/> lifetime to the
/// Generic Host lifetime in both directions:
/// <list type="bullet">
///   <item>Closing the window triggers <see cref="IHostApplicationLifetime.StopApplication"/>.</item>
///   <item>Stopping the host closes the window if it is still open.</item>
/// </list>
/// </summary>
/// <remarks>
/// This service does not call <see cref="PhotinoWindow.WaitForClose"/> itself — that must
/// happen on the main thread via <c>host.RunWebViewAsync()</c>. By the time
/// <c>host.StartAsync()</c> returns, this service's <see cref="StartAsync"/> has already
/// completed and all handlers are wired, so <see cref="PhotinoWindow.WaitForClose"/> can
/// be called immediately.
/// </remarks>
internal sealed partial class WebViewService(
    PhotinoWindow window,
    WebViewRouter router,
    IHostApplicationLifetime lifetime,
    ILogger<WebViewService> logger) 
    : IHostedService
{
    private volatile bool closedByUser;

    /// <inheritdoc/>
    public Task StartAsync(CancellationToken cancellationToken)
    {
        // Register first so that user-registered handlers (added later) can still
        // veto the close by returning true — multicast delegate invocation returns
        // the last handler's value, so ours runs first and theirs wins.
        window.RegisterWindowClosingHandler(OnWindowClosing);
        window.RegisterWebMessageReceivedHandler(OnMessageReceived);

        return Task.CompletedTask;
    }

    /// <inheritdoc/>
    public Task StopAsync(CancellationToken cancellationToken)
    {
        // Only close programmatically if the user did not already close the window.
        // Calling Close() before the native instance is created would throw.
        if (!closedByUser && window.IsInitialized)
            window.Close();

        return Task.CompletedTask;
    }

    private bool OnWindowClosing(object sender, EventArgs e)
    {
        closedByUser = true;
        lifetime.StopApplication();
        return false; // false = allow the close to proceed
    }

    private void OnMessageReceived(object? sender, string message)
    {
        LogMessageReceived(logger, message);

        // Fire and forget — route on a thread-pool thread so we don't block
        // Photino's UI thread while the handler runs.
        _ = Task.Run(async () =>
        {
            try
            {
                await router.RouteAsync(message);
            }
            catch (Exception ex)
            {
                LogUnhandledExceptionRoutingMessage(logger, ex);
            }
        });
    }
}
