using Microsoft.AspNetCore.Mvc;
using MoodTracker.Server.API.DTOs;
using MoodTracker.Server.API.Services;

namespace MoodTracker.Server.API.Endpoints;

[ApiController]
[Route("api/Stats")]
public class StatsController(StatsService service) : ControllerBase
{
    [HttpGet("GetMedCountForTimePeriod/{startDate}/{endDate}")]
    public IEnumerable<MedCountForTimePeriodDto> GetMedCountForTimePeriod(DateOnly startDate, DateOnly endDate)
    {
        return service.GetMedCountForTimePeriod(startDate,endDate);
    }

}

  