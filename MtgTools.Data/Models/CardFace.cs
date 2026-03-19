using System.Text.Json;
using System.Text.Json.Serialization;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.ChangeTracking;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;

namespace MtgTools.Data.Models;

public sealed class CardFace
{
    public string Artist { get; set; } = string.Empty;
    public Guid? ArtistId { get; set; }
    public decimal Cmc { get; set; }
    public List<string> ColorIndicator { get; set; } = new();
    public List<string> Colors { get; set; } = new();
    public string Defense { get; set; } = string.Empty;
    public string FlavorText { get; set; } = string.Empty;
    public Guid? IllustrationId { get; set; }
    public Dictionary<string, string> ImageUris { get; set; } = new();
    public string Layout { get; set; } = string.Empty;
    public string Loyalty { get; set; } = string.Empty;
    public string ManaCost { get; set; } = string.Empty;
    public string Name { get; set; } = string.Empty;
    public Guid? OracleId { get; set; }
    public string OracleText { get; set; } = string.Empty;
    public string Power { get; set; } = string.Empty;
    public string PrintedName { get; set; } = string.Empty;
    public string PrintedText { get; set; } = string.Empty;
    public string PrintedTypeLine { get; set; } = string.Empty;
    public string Toughness { get; set; } = string.Empty;
    public string TypeLine { get; set; } = string.Empty;
    public string Watermark { get; set; } = string.Empty;
}

public sealed class CardFaceEntityTypeConfiguration : IEntityTypeConfiguration<CardFace>
{
    private static readonly JsonSerializerOptions SerializerOptions = new(JsonSerializerDefaults.Web);

    public void Configure(EntityTypeBuilder<CardFace> entity)
    {
        entity.Property(face => face.Artist).HasMaxLength(256);
        entity.Property(face => face.Layout).HasMaxLength(128);
        entity.Property(face => face.ManaCost).HasMaxLength(256);
        entity.Property(face => face.Name).HasMaxLength(512);
        entity.Property(face => face.TypeLine).HasMaxLength(512);
        entity.Property(face => face.PrintedName).HasMaxLength(512);
        entity.Property(face => face.PrintedTypeLine).HasMaxLength(512);
        entity.Property(face => face.Watermark).HasMaxLength(128);

        ConfigureJsonProperty(entity.Property(face => face.ColorIndicator), static () => new List<string>());
        ConfigureJsonProperty(entity.Property(face => face.Colors), static () => new List<string>());
        ConfigureJsonProperty(entity.Property(face => face.ImageUris), static () => new Dictionary<string, string>());
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

