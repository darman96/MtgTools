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
    public Guid Id { get; set; }
    public string Lang { get; set; } = string.Empty;
    public int? MtgoId { get; set; }
    public int? MtgoFoilId { get; set; }
    public List<int> MultiverseIds { get; set; } = new();
    public int? TcgplayerId { get; set; }
    public int? TcgplayerEtchedId { get; set; }
    public int? CardmarketId { get; set; }
    public string Layout { get; set; } = string.Empty;
    public Guid? OracleId { get; set; }
    public string PrintsSearchUri { get; set; } = string.Empty;
    public string RulingsUri { get; set; } = string.Empty;
    public string ScryfallUri { get; set; } = string.Empty;
    public string Uri { get; set; } = string.Empty;
    public List<RelatedCard> AllParts { get; set; } = new();
    public List<CardFace> CardFaces { get; set; } = new();
    public decimal Cmc { get; set; }
    public List<string> ColorIdentity { get; set; } = new();
    public List<string> ColorIndicator { get; set; } = new();
    public List<string> Colors { get; set; } = new();
    public string Defense { get; set; } = string.Empty;
    public int? EdhrecRank { get; set; }
    public bool GameChanger { get; set; }
    public string HandModifier { get; set; } = string.Empty;
    public List<string> Keywords { get; set; } = new();
    public Dictionary<string, string> Legalities { get; set; } = new();
    public string LifeModifier { get; set; } = string.Empty;
    public string Loyalty { get; set; } = string.Empty;
    public string ManaCost { get; set; } = string.Empty;
    public string Name { get; set; } = string.Empty;
    public string OracleText { get; set; } = string.Empty;
    public int? PennyRank { get; set; }
    public string Power { get; set; } = string.Empty;
    public List<string> ProducedMana { get; set; } = new();
    public bool Reserved { get; set; }
    public string Toughness { get; set; } = string.Empty;
    public string TypeLine { get; set; } = string.Empty;
    public string Artist { get; set; } = string.Empty;
    public List<Guid> ArtistIds { get; set; } = new();
    public List<string> AttractionLights { get; set; } = new();
    public bool Booster { get; set; }
    public string BorderColor { get; set; } = string.Empty;
    public Guid CardBackId { get; set; }
    public string CollectorNumber { get; set; } = string.Empty;
    public bool ContentWarning { get; set; }
    public bool Digital { get; set; }
    public List<string> Finishes { get; set; } = new();
    public string FlavorName { get; set; } = string.Empty;
    public string FlavorText { get; set; } = string.Empty;
    public List<string> FrameEffects { get; set; } = new();
    public string Frame { get; set; } = string.Empty;
    public bool FullArt { get; set; }
    public List<string> Games { get; set; } = new();
    public bool HighresImage { get; set; }
    public Guid? IllustrationId { get; set; }
    public string ImageStatus { get; set; } = string.Empty;
    public Dictionary<string, string> ImageUris { get; set; } = new();
    public bool Oversized { get; set; }
    public Dictionary<string, string> Prices { get; set; } = new();
    public string PrintedName { get; set; } = string.Empty;
    public string PrintedText { get; set; } = string.Empty;
    public string PrintedTypeLine { get; set; } = string.Empty;
    public bool Promo { get; set; }
    public List<string> PromoTypes { get; set; } = new();
    public Dictionary<string, string> PurchaseUris { get; set; } = new();
    public string Rarity { get; set; } = string.Empty;
    public Dictionary<string, string> RelatedUris { get; set; } = new();
    public DateTime? ReleasedAt { get; set; }
    public bool Reprint { get; set; }
    public string ScryfallSetUri { get; set; } = string.Empty;
    public string SetName { get; set; } = string.Empty;
    public string SetSearchUri { get; set; } = string.Empty;
    public string SetType { get; set; } = string.Empty;
    public string SetUri { get; set; } = string.Empty;
    public string Set { get; set; } = string.Empty;
    public Guid SetId { get; set; }
    public bool StorySpotlight { get; set; }
    public bool Textless { get; set; }
    public bool Variation { get; set; }
    public Guid? VariationOf { get; set; }
    public string SecurityStamp { get; set; } = string.Empty;
    public string Watermark { get; set; } = string.Empty;
    public PreviewInfo Preview { get; set; } = new();

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

        ConfigureJsonProperty(entity.Property(card => card.MultiverseIds), static () => new List<int>());
        ConfigureJsonProperty(entity.Property(card => card.ColorIdentity), static () => new List<string>());
        ConfigureJsonProperty(entity.Property(card => card.ColorIndicator), static () => new List<string>());
        ConfigureJsonProperty(entity.Property(card => card.Colors), static () => new List<string>());
        ConfigureJsonProperty(entity.Property(card => card.Keywords), static () => new List<string>());
        ConfigureJsonProperty(entity.Property(card => card.Legalities), static () => new Dictionary<string, string>());
        ConfigureJsonProperty(entity.Property(card => card.ProducedMana), static () => new List<string>());
        ConfigureJsonProperty(entity.Property(card => card.ArtistIds), static () => new List<Guid>());
        ConfigureJsonProperty(entity.Property(card => card.AttractionLights), static () => new List<string>());
        ConfigureJsonProperty(entity.Property(card => card.Finishes), static () => new List<string>());
        ConfigureJsonProperty(entity.Property(card => card.FrameEffects), static () => new List<string>());
        ConfigureJsonProperty(entity.Property(card => card.Games), static () => new List<string>());
        ConfigureJsonProperty(entity.Property(card => card.ImageUris), static () => new Dictionary<string, string>());
        ConfigureJsonProperty(entity.Property(card => card.Prices), static () => new Dictionary<string, string>());
        ConfigureJsonProperty(entity.Property(card => card.PromoTypes), static () => new List<string>());
        ConfigureJsonProperty(entity.Property(card => card.PurchaseUris), static () => new Dictionary<string, string>());
        ConfigureJsonProperty(entity.Property(card => card.RelatedUris), static () => new Dictionary<string, string>());

        entity.OwnsMany(card => card.AllParts, owned =>
        {
            owned.ToTable("CardAllParts");
            owned.WithOwner().HasForeignKey("CardId");
            owned.Property<int>("Order");
            owned.HasKey("CardId", "Order");

            owned.Property(part => part.Id).HasColumnName(nameof(RelatedCard.Id));
            owned.Property(part => part.Component).HasMaxLength(64);
            owned.Property(part => part.Name).HasMaxLength(512);
            owned.Property(part => part.TypeLine).HasMaxLength(512);
            owned.Property(part => part.Uri).HasMaxLength(2048);
        });

        entity.OwnsMany(card => card.CardFaces, owned =>
        {
            owned.ToTable("CardFaces");
            owned.WithOwner().HasForeignKey("CardId");
            owned.Property<int>("Order");
            owned.HasKey("CardId", "Order");

            // CardFaceEntityTypeConfiguration handles owned properties
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




