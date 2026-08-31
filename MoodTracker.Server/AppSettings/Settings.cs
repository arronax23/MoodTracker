using MoodTracker.API.Abstractions;

namespace MoodTracker.Infrastructure.AppSettings;

public class Settings(IConfiguration configuration) : ISettings
{
    public DateTime WellbutrinReferenceDay => configuration.GetValue<DateTime>("WellbutrinDay:ReferenceDay");
}
