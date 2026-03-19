namespace MtgTools.Data.Models;

public sealed class PreviewInfo
{
    public DateTime? PreviewedAt { get; set; }
    public string SourceUri { get; set; } = string.Empty;
    public string Source { get; set; } = string.Empty;
}

