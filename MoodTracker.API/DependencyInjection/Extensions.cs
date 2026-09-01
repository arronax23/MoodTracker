using Microsoft.Extensions.DependencyInjection;
using MoodTracker.API.EventHandlers.Utilities;
using MoodTracker.API.Services;

namespace MoodTracker.API.DependencyInjection;

public static  class Extensions
{
    public static void AddAPIServices(this IServiceCollection services)
    {
        services.AddScoped<NoteService>();
        services.AddScoped<MoodProgressService>();
        services.AddScoped<WellbutrinInfoService>();
        services.AddScoped<HistogramService>();
        services.AddScoped<MedicationSetService>();
        services.AddScoped<StatsService>();

        services.AddScoped<MedCountUtility>();
    }
}
