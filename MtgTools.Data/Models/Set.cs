using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace MtgTools.Data.Models;

public sealed class Set
{
    public Guid Id { get; set; }
    public string Code { get; set; } = string.Empty;
    public string? MtgoCode { get; set; }
    public string? ArenaCode { get; set; }
    public int? TcgplayerId { get; set; }
    public string Name { get; set; } = string.Empty;
    public string SetType { get; set; } = string.Empty;
    public DateTime? ReleasedAt { get; set; }
    public string? BlockCode { get; set; }
    public string? Block { get; set; }
    public string? ParentSetCode { get; set; }
    public int CardCount { get; set; }
    public int? PrintedSize { get; set; }
    public bool Digital { get; set; }
    public bool FoilOnly { get; set; }
    public bool NonfoilOnly { get; set; }
    public string ScryfallUri { get; set; } = string.Empty;
    public string Uri { get; set; } = string.Empty;
    public string IconSvgUri { get; set; } = string.Empty;
    public string SearchUri { get; set; } = string.Empty;

    public ICollection<Card> Cards { get; set; } = new List<Card>();
}

public sealed class SetEntityTypeConfiguration : IEntityTypeConfiguration<Set>
{
    public void Configure(EntityTypeBuilder<Set> entity)
    {
        entity.HasKey(cardSet => cardSet.Id);
        entity.HasIndex(cardSet => cardSet.Code).IsUnique();

        entity.Property(cardSet => cardSet.Code).HasMaxLength(16);
        entity.Property(cardSet => cardSet.Name).HasMaxLength(256);
        entity.Property(cardSet => cardSet.SetType).HasMaxLength(64);
    }
}


