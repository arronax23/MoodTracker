using MoodTracker.Server.Infrasctructure;

namespace MoodTracker.Server.API.Services;

public class WellbutrinInfoService(Settings settings)
{
    public bool IsWellbutrinDay(DateTime date) => (date - settings.WellbutrinReferenceDay).TotalDays % 2 == 0;
}