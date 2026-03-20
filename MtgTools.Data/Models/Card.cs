using System.Text.Json;
using System.Text.Json.Serialization;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.ChangeTracking;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;

namespace MtgTools.Data.Models;

public sealed class Card
{
    public int? ArenaId { get; set; }
    public required Guid Id { get; set; }
    public required string Lang { get; set; }
    public int? MtgoId { get; set; }
    public int? MtgoFoilId { get; set; }
    public required List<int> MultiverseIds { get; set; }
    public required int? TcgplayerId { get; set; }
    public required int? TcgplayerEtchedId { get; set; }
    public required int? CardmarketId { get; set; }
    public required string Layout { get; set; }
    public Guid? OracleId { get; set; }
    public required string PrintsSearchUri { get; set; }
    public required string RulingsUri { get; set; }
    public required string ScryfallUri { get; set; }
    public required string Uri { get; set; } = string.Empty;
    public required List<RelatedCard> AllParts { get; set; }
    public required List<CardFace> CardFaces { get; set; }
    public required decimal Cmc { get; set; }
    public required List<string> ColorIdentity { get; set; }
    public required List<string> ColorIndicator { get; set; }
    public required List<string> Colors { get; set; }
    public required string Defense { get; set; }
    public int? EdhrecRank { get; set; }
    public required bool GameChanger { get; set; }
    public required string HandModifier { get; set; }
    public required List<string> Keywords { get; set; }
    public required Dictionary<string, string> Legalities { get; set; }
    public required string LifeModifier { get; set; }
    public required string Loyalty { get; set; }
    public required string ManaCost { get; set; }
    public required string Name { get; set; }
    public required string OracleText { get; set; }
    public int? PennyRank { get; set; }
    public required string Power { get; set; }
    public required List<string> ProducedMana { get; set; }
    public required bool Reserved { get; set; }
    public required string Toughness { get; set; }
    public required string TypeLine { get; set; }
    public required string Artist { get; set; }
    public required List<Guid> ArtistIds { get; set; }
    public required List<string> AttractionLights { get; set; }
    public required bool Booster { get; set; }
    public required string BorderColor { get; set; }
    public required Guid CardBackId { get; set; }
    public required string CollectorNumber { get; set; }
    public required bool ContentWarning { get; set; }
    public required bool Digital { get; set; }
    public required List<string> Finishes { get; set; }
    public required string FlavorName { get; set; }
    public required string FlavorText { get; set; }
    public required List<string> FrameEffects { get; set; }
    public required string Frame { get; set; }
    public required bool FullArt { get; set; }
    public required List<string> Games { get; set; }
    public required bool HighresImage { get; set; }
    public Guid? IllustrationId { get; set; }
    public required string ImageStatus { get; set; }
    public required Dictionary<string, string> ImageUris { get; set; }
    public required bool Oversized { get; set; }
    public required Dictionary<string, string> Prices { get; set; }
    public required string PrintedName { get; set; }
    public required string PrintedText { get; set; }
    public required string PrintedTypeLine { get; set; }
    public required bool Promo { get; set; }
    public required List<string> PromoTypes { get; set; }
    public required Dictionary<string, string> PurchaseUris { get; set; }
    public required string Rarity { get; set; }
    public required Dictionary<string, string> RelatedUris { get; set; }
    public DateTime? ReleasedAt { get; set; }
    public required bool Reprint { get; set; }
    public required string ScryfallSetUri { get; set; }
    public required string SetName { get; set; }
    public required string SetSearchUri { get; set; }
    public required string SetType { get; set; }
    public required string SetUri { get; set; }
    public required string Set { get; set; }
    public required Guid SetId { get; set; }
    public required bool StorySpotlight { get; set; }
    public required bool Textless { get; set; }
    public required bool Variation { get; set; }
    public Guid? VariationOf { get; set; }
    public required string SecurityStamp { get; set; }
    public required string Watermark { get; set; }
    public required PreviewInfo Preview { get; set; }

    [JsonIgnore]
    public Set? CardSet { get; set; }
}

public sealed class CardEntityTypeConfiguration : IEntityTypeConfiguration<Card>
{
    private static readonly JsonSerializerOptions SerializerOptions = new(JsonSerializerDefaults.Web);

    public void Configure(EntityTypeBuilder<Card> entity)
    {
        entity.HasKey(card => card.Id);

        entity.HasIndex(card => card.Name);
        entity.HasIndex(card => card.OracleId);
        entity.HasIndex(card => new { card.Set, card.CollectorNumber });

        entity.Property(card => card.Name).HasMaxLength(512);
        entity.Property(card => card.Lang).HasMaxLength(32);
        entity.Property(card => card.Layout).HasMaxLength(128);
        entity.Property(card => card.Set).HasMaxLength(16);
        entity.Property(card => card.CollectorNumber).HasMaxLength(32);
        entity.Property(card => card.Rarity).HasMaxLength(64);
        entity.Property(card => card.SetType).HasMaxLength(64);

        ConfigureJsonProperty(entity.Property(card => card.MultiverseIds), static () => []);
        ConfigureJsonProperty(entity.Property(card => card.ColorIdentity), static () => []);
        ConfigureJsonProperty(entity.Property(card => card.ColorIndicator), static () => []);
        ConfigureJsonProperty(entity.Property(card => card.Colors), static () => []);
        ConfigureJsonProperty(entity.Property(card => card.Keywords), static () => []);
        ConfigureJsonProperty(entity.Property(card => card.Legalities), static () => new Dictionary<string, string>());
        ConfigureJsonProperty(entity.Property(card => card.ProducedMana), static () => []);
        ConfigureJsonProperty(entity.Property(card => card.ArtistIds), static () => []);
        ConfigureJsonProperty(entity.Property(card => card.AttractionLights), static () => []);
        ConfigureJsonProperty(entity.Property(card => card.Finishes), static () => []);
        ConfigureJsonProperty(entity.Property(card => card.FrameEffects), static () => []);
        ConfigureJsonProperty(entity.Property(card => card.Games), static () => []);
        ConfigureJsonProperty(entity.Property(card => card.ImageUris), static () => new Dictionary<string, string>());
        ConfigureJsonProperty(entity.Property(card => card.Prices), static () => new Dictionary<string, string>());
        ConfigureJsonProperty(entity.Property(card => card.PromoTypes), static () => []);
        ConfigureJsonProperty(entity.Property(card => card.PurchaseUris), static () => new Dictionary<string, string>());
        ConfigureJsonProperty(entity.Property(card => card.RelatedUris), static () => new Dictionary<string, string>());

        entity.OwnsMany(card => card.AllParts, owned =>
        {
            owned.ToTable("CardAllParts");
            
            owned.Property(part => part.Component).HasMaxLength(64);
            owned.Property(part => part.Name).HasMaxLength(512);
            owned.Property(part => part.TypeLine).HasMaxLength(512);
            owned.Property(part => part.Uri).HasMaxLength(2048);
        });

        entity.OwnsMany(card => card.CardFaces, owned =>
        {
            owned.ToTable("CardFaces");
            owned.HasKey("Id");
            
            owned.Property(face => face.Artist).HasMaxLength(256);
            owned.Property(face => face.Layout).HasMaxLength(128);
            owned.Property(face => face.ManaCost).HasMaxLength(256);
            owned.Property(face => face.Name).HasMaxLength(512);
            owned.Property(face => face.TypeLine).HasMaxLength(512);
            owned.Property(face => face.PrintedName).HasMaxLength(512);
            owned.Property(face => face.PrintedTypeLine).HasMaxLength(512);
            owned.Property(face => face.Watermark).HasMaxLength(128);

            ConfigureJsonProperty(owned.Property(face => face.ColorIndicator), static () => []);
            ConfigureJsonProperty(owned.Property(face => face.Colors), static () => []);
            ConfigureJsonProperty(owned.Property(face => face.ImageUris), static () => new Dictionary<string, string>());
        });

        entity.OwnsOne(card => card.Preview, owned =>
        {
            owned.Property(preview => preview.PreviewedAt).HasColumnName("PreviewedAt");
            owned.Property(preview => preview.SourceUri).HasColumnName("PreviewSourceUri").HasMaxLength(2048);
            owned.Property(preview => preview.Source).HasColumnName("PreviewSource").HasMaxLength(256);
        });

        entity.Navigation(card => card.Preview).IsRequired();

        entity
            .HasOne(card => card.CardSet)
            .WithMany(cardSet => cardSet.Cards)
            .HasForeignKey(card => card.SetId)
            .OnDelete(DeleteBehavior.Restrict);
    }

    private static void ConfigureJsonProperty<TProperty>(
        PropertyBuilder<TProperty> propertyBuilder,
        Func<TProperty> defaultFactory)
    {
        var converter = new ValueConverter<TProperty, string>(
            value => JsonSerializer.Serialize(value, SerializerOptions),
            value => string.IsNullOrWhiteSpace(value)
                ? defaultFactory()
                : JsonSerializer.Deserialize<TProperty>(value, SerializerOptions) ?? defaultFactory());

        var comparer = new ValueComparer<TProperty>(
            (left, right) => Serialize(left) == Serialize(right),
            value => value == null ? 0 : Serialize(value).GetHashCode(StringComparison.Ordinal),
            value => value == null
                ? defaultFactory()
                : JsonSerializer.Deserialize<TProperty>(Serialize(value), SerializerOptions) ?? defaultFactory());

        propertyBuilder.HasColumnType("TEXT");
        propertyBuilder.HasConversion(converter);
        propertyBuilder.Metadata.SetValueComparer(comparer);
    }

    private static string Serialize<TProperty>(TProperty value) =>
        JsonSerializer.Serialize(value, SerializerOptions);
}




