using Microsoft.EntityFrameworkCore;
using MtgTools.Data.Models;

namespace MtgTools.Data;

public sealed class MtgToolsDbContext(DbContextOptions<MtgToolsDbContext> options) : DbContext(options)
{
    public DbSet<Card> Cards => Set<Card>();
    public DbSet<Set> Sets => Set<Set>();
    public DbSet<Ruling> Rulings => Set<Ruling>();

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);

        modelBuilder.ApplyConfigurationsFromAssembly(typeof(MtgToolsDbContext).Assembly);
    }
}



