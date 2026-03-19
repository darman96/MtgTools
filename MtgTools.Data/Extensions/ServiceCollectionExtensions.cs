using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;

namespace MtgTools.Data.Extensions;

public static class ServiceCollectionExtensions
{
    public static IServiceCollection AddMtgToolsData(this IServiceCollection services, string connectionString)
    {
        ArgumentException.ThrowIfNullOrWhiteSpace(connectionString);

        services.AddDbContext<MtgToolsDbContext>(options => options.UseSqlite(connectionString));
        return services;
    }
}

