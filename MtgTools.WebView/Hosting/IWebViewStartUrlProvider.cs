namespace MtgTools.WebView.Hosting;

/// <summary>
/// Provides the initial URL that should be loaded in the WebView.
/// </summary>
public interface IWebViewStartUrlProvider
{
    string StartUrl { get; }
}
