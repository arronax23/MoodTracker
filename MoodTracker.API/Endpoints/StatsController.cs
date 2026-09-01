using Microsoft.AspNetCore.Mvc;
using MoodTracker.API.DTOs;
using MoodTracker.API.Services;

namespace MoodTracker.API.Endpoints;

[ApiController]
[Route("api/Stats")]
public class StatsController(StatsService service) : ControllerBase
{
    [HttpGet("GetMedCountForTimePeriod/{startDate}/{endDate}")]
    public IEnumerable<MedCountForTimePeriodDto> GetMedCountForTimePeriod(DateOnly startDate, DateOnly endDate)
    {
        return service.GetMedCountForTimePeriod(startDate,endDate);
    }
    [HttpGet("GetMedCountForTimePeriod_Fast")]
    public IEnumerable<MedCountForTimePeriodDto> GetMedCountForTimePeriod_Fast(DateOnly startDate, DateOnly endDate)
    {
        return service.GetMedCountForTimePeriod_Fast(startDate, endDate);
    }

}

  