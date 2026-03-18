// See https://aka.ms/new-console-template for more information

using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Hosting;
using MtgTools.App.Handlers;
using MtgTools.WebView.Extensions;
using ScryfallClient.Extensions.DependencyInjection;

const string DefaultContentRoot = "wwwroot";
const string UseStorybookModeConfigKey = "Startup:UseStorybook";
var appContentRoot = Path.Combine(DefaultContentRoot, "app");
var storybookContentRoot = Path.Combine(DefaultContentRoot, "storybook");
var normalizedArgs = args
    .Select(arg => string.Equals(arg, "--storybook", StringComparison.OrdinalIgnoreCase)
        ? "--storybook=true"
        : arg)
    .ToArray();

var builder = Host.CreateApplicationBuilder();


builder.Configuration
    .AddCommandLine(normalizedArgs, new Dictionary<string, string>
    {
        ["--storybook"] = UseStorybookModeConfigKey,
    })
    .AddJsonFile("appsettings.json", optional: true, reloadOnChange: true);

var useStorybookMode = builder.Configuration.GetValue<bool>(UseStorybookModeConfigKey);
var contentRoot = useStorybookMode ? storybookContentRoot : appContentRoot;
builder.Services
    .AddWebView(options =>
    {
        options.ContentPath = contentRoot;
        options.Window.Title = "Mtg Tools";
        options.Window.UseOsDefaultSize = false;
        options.Window.Width = 800;
        options.Window.Height = 600;
        options.Browser.UserAgent = "Mtg Tools WebView";
    })
    .AddWebMessageHandler<EchoHandler, EchoRequest, EchoResponse>("echo");

builder.Services.UseScryfallClient();

var host = builder.Build();
await host.RunWebViewAsync();
