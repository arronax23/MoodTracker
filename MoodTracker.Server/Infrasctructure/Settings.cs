namespace MoodTracker.Server.Infrasctructure;

public class Settings(IConfiguration configuration)
{
    public DateTime WellbutrinReferenceDay => configuration.GetValue<DateTime>("WellbutrinDay:ReferenceDay");
}
