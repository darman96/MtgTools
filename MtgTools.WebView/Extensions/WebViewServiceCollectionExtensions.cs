using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using MtgTools.WebView.Messaging;
using MtgTools.WebView.WebView;
using Photino.NET;
using Photino.NET.Options;
using System.Text.Json;
using MtgTools.WebView.Hosting;

namespace MtgTools.WebView.Extensions;

public static class WebViewServiceCollectionExtensions
{
    extension(IServiceCollection services)
    {
        /// <summary>
        /// Registers <see cref="PhotinoWindow"/> and its <see cref="IHostedService"/> wrapper
        /// with the DI container.
        /// </summary>
        public IServiceCollection AddWebView(Action<PhotinoOptions>? configure = null)
        {
            var options = new PhotinoOptions();
            configure?.Invoke(options);
            
            services.AddSingleton(provider 
                => new PhotinoWindow(provider.GetRequiredService<ILogger<PhotinoWindow>>(), options));

            // Messaging infrastructure
            services.AddSingleton<WebMessageSender>();
            services.AddSingleton<IWebMessageSender>(sp => sp.GetRequiredService<WebMessageSender>());
            
            services.AddSingleton<WebViewRouter>(sp => new WebViewRouter(
                sp.GetServices<WebViewRouter.HandlerRegistration>(),
                sp,
                sp.GetRequiredService<IWebMessageSender>(),
                sp.GetRequiredService<ILogger<WebViewRouter>>()));

            services.AddStaticFileServer(configureFileServer 
                => configureFileServer.ContentRoot = options.ContentPath);
            
            // Register as concrete type and hosted service so the host manages its lifetime.
            services.AddSingleton<WebViewService>();
            services.AddHostedService(sp => sp.GetRequiredService<WebViewService>());

            return services;
        }

        /// <summary>
        /// Registers a message handler for the specified channel. The handler is resolved from DI
        /// for each incoming message on that channel.
        /// </summary>
        public IServiceCollection AddWebMessageHandler<THandler, TRequest, TResponse>(string channel)
            where THandler : class, IWebMessageHandler<TRequest, TResponse>
        {
            services.AddTransient<THandler>();

            services.AddSingleton(new WebViewRouter.HandlerRegistration(
                channel,
                typeof(THandler),
                async (sp, sender, envelope) =>
                {
                    var handler = sp.GetRequiredService<THandler>();
                    var request = DeserializePayload<TRequest>(envelope.Payload);
                    var response = await handler.HandleAsync(request, CancellationToken.None);
                    sender.SendResponse(envelope.Id, envelope.Channel, response);
                }));

            return services;
        }

        /// <summary>
        /// Registers a fire-and-forget message handler for the specified channel. A response
        /// envelope with null payload is still sent to resolve the frontend's promise.
        /// </summary>
        public IServiceCollection AddWebMessageHandler<THandler, TRequest>(string channel)
            where THandler : class, IWebMessageHandler<TRequest>
        {
            services.AddTransient<THandler>();

            services.AddSingleton(new WebViewRouter.HandlerRegistration(
                channel,
                typeof(THandler),
                async (sp, sender, envelope) =>
                {
                    var handler = sp.GetRequiredService<THandler>();
                    var request = DeserializePayload<TRequest>(envelope.Payload);
                    await handler.HandleAsync(request, CancellationToken.None);
                    sender.SendResponse<object>(envelope.Id, envelope.Channel, null!);
                }));

            return services;
        }
        
        internal IServiceCollection AddStaticFileServer(Action<LocalhostStaticFileServerOptions>? configure = null)
        {
            var options = new LocalhostStaticFileServerOptions();
            configure?.Invoke(options);
            
            services.AddSingleton<LocalhostStaticFileServer>(provider 
                => new LocalhostStaticFileServer(
                    options,
                    provider.GetRequiredService<ILogger<LocalhostStaticFileServer>>()));
            services.AddSingleton<IWebViewStartUrlProvider>(sp => sp.GetRequiredService<LocalhostStaticFileServer>());
            services.AddHostedService(sp => sp.GetRequiredService<LocalhostStaticFileServer>());
            
            return services;
        }
    }

    private static readonly JsonSerializerOptions DeserializerOptions = new()
    {
        PropertyNamingPolicy = JsonNamingPolicy.CamelCase,
    };

    private static T DeserializePayload<T>(JsonElement? payload) =>
        payload is null ? default! : payload.Value.Deserialize<T>(DeserializerOptions)!;
}
