using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace MtgTools.Data.Models;

public sealed class Ruling
{
    public Guid OracleId { get; set; }
    public string Source { get; set; } = string.Empty;
    public DateTime PublishedAt { get; set; }
    public string Comment { get; set; } = string.Empty;
}

public sealed class RulingEntityTypeConfiguration : IEntityTypeConfiguration<Ruling>
{
    public void Configure(EntityTypeBuilder<Ruling> entity)
    {
        entity.HasKey(ruling => new { ruling.OracleId, ruling.Source, ruling.PublishedAt, ruling.Comment });
        entity.HasIndex(ruling => ruling.OracleId);
        entity.Property(ruling => ruling.Source).HasMaxLength(32);
    }
}


