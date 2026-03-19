namespace MtgTools.Data.Models;

public sealed class RelatedCard
{
    public Guid Id { get; set; }
    public string Component { get; set; } = string.Empty;
    public string Name { get; set; } = string.Empty;
    public string TypeLine { get; set; } = string.Empty;
    public string Uri { get; set; } = string.Empty;
}

