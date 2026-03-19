using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Design;

namespace MtgTools.Data;

// Design-time factory used by 'dotnet ef' to create a DbContext instance for migrations.
public class MtgToolsDbContextFactory : IDesignTimeDbContextFactory<MtgToolsDbContext>
{
    public MtgToolsDbContext CreateDbContext(string[] args)
    {
        var optionsBuilder = new DbContextOptionsBuilder<MtgToolsDbContext>();

        // Use a file-based SQLite DB in the current directory for design-time operations.
        // This path is harmless and used only for creating migrations / design-time metadata.
        var dataDir = Path.Combine(Directory.GetCurrentDirectory(), ".ef_design");
        Directory.CreateDirectory(dataDir);
        var dbPath = Path.Combine(dataDir, "mtgtools.designtime.db");
        var connectionString = $"Data Source={dbPath}";

        optionsBuilder.UseSqlite(connectionString);

        return new MtgToolsDbContext(optionsBuilder.Options);
    }
}

