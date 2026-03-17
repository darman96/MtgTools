using System.Net;
using System.Net.Sockets;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.FileProviders;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;

namespace MtgTools.WebView.Hosting;

internal sealed partial class LocalhostStaticFileServer(
    LocalhostStaticFileServerOptions options,
    ILogger<LocalhostStaticFileServer> logger)
    : IHostedService, IWebViewStartUrlProvider, IAsyncDisposable
{
    public string StartUrl { get; private set; } = DefaultStartUrl;
    
    private const string DefaultContentRoot = "wwwroot";
    private const string DefaultStartUrl = "http://127.0.0.1/"; 
    
    private WebApplication? app;

    public async Task StartAsync(CancellationToken cancellationToken)
    {
        var contentRoot = options.ContentRoot.IsWhiteSpace() 
            ? DefaultContentRoot 
            : options.ContentRoot;
        var contentRootPath = Path.Combine(
            AppContext.BaseDirectory,
            contentRoot);
        
        if (!Directory.Exists(contentRootPath))
            throw new DirectoryNotFoundException($"Could not find content root at '{contentRootPath}'.");

        var port = GetRandomLoopbackPort();
        var urlWithPort = $"http://127.0.0.1:{port}/";
        StartUrl = urlWithPort;

        var builder = WebApplication.CreateSlimBuilder();
        builder.WebHost.UseUrls(urlWithPort);

        var localApp = builder.Build();
        var fileProvider = new PhysicalFileProvider(contentRootPath);
        var indexHtmlPath = Path.Combine(contentRootPath, "index.html");

        localApp.UseDefaultFiles(new DefaultFilesOptions
        {
            FileProvider = fileProvider,
            DefaultFileNames = { "index.html" }
        });

        localApp.UseStaticFiles(new StaticFileOptions
        {
            FileProvider = fileProvider
        });
        
        localApp.MapFallback(async context =>
        {
            context.Response.ContentType = "text/html; charset=utf-8";
            await context.Response.SendFileAsync(indexHtmlPath, context.RequestAborted);
        });
        
        app = localApp;
        await app.StartAsync(cancellationToken);
        LogLocalWebServerStarted(logger, urlWithPort, contentRootPath);
    }

    public async Task StopAsync(CancellationToken cancellationToken)
    {
        if (app is null)
            return;
        
        await app.StopAsync(cancellationToken);
        await app.DisposeAsync();
        app = null;
    }

    public async ValueTask DisposeAsync()
    {
        if (app is not null)
            await app.DisposeAsync();
    }

    private static int GetRandomLoopbackPort()
    {
        using var listener = new TcpListener(IPAddress.Loopback, 0);
        listener.Start();
        return ((IPEndPoint)listener.LocalEndpoint).Port;
    }

    [LoggerMessage(LogLevel.Information, "Started local web server at {Url} serving {WebRoot}")]
    static partial void LogLocalWebServerStarted(ILogger<LocalhostStaticFileServer> logger, string url, string webRoot);
}
