namespace MtgTools.Data.Models;

public sealed class RelatedCard
{
    public required Guid Id { get; set; }
    public required string Component { get; set; }
    public required string Name { get; set; }
    public required string TypeLine { get; set; }
    public required string Uri { get; set; }
}

