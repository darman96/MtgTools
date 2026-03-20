namespace MtgTools.Data.Models;

public sealed class CardFace
{
    public required string Artist { get; set; }
    public Guid? ArtistId { get; set; }
    public required decimal Cmc { get; set; }
    public required List<string> ColorIndicator { get; set; }
    public required List<string> Colors { get; set; }
    public required string Defense { get; set; }
    public required string FlavorText { get; set; }
    public Guid? IllustrationId { get; set; }
    public required Dictionary<string, string> ImageUris { get; set; }
    public required string Layout { get; set; }
    public required string Loyalty { get; set; }
    public required string ManaCost { get; set; }
    public required string Name { get; set; }
    public Guid? OracleId { get; set; }
    public required string OracleText { get; set; }
    public required string Power { get; set; }
    public required string PrintedName { get; set; }
    public required string PrintedText { get; set; }
    public required string PrintedTypeLine { get; set; }
    public required string Toughness { get; set; }
    public required string TypeLine { get; set; }
    public required string Watermark { get; set; }
}