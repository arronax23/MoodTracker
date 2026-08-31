using Microsoft.AspNetCore.Mvc;
using MoodTracker.API.DTOs;
using MoodTracker.API.Services;

namespace MoodTracker.API.Endpoints;

[Route("api/Wellbutrin")]
[ApiController]
public class WellbutrinInfoController(WellbutrinInfoService service) : ControllerBase
{
    [HttpGet("GetWellbutrinDay/{date}")]
    public bool GetWellbutrinDay(DateTime date)
    {
        return service.IsWellbutrinDay(date);
    }

    [HttpGet("GetRatingByWellbutrin")]
    public RatingByWellbutrinDayDto GetRatingByWellbutrin()
    {
        return service.GetRatingByWellbutrinDay();
    }
}
