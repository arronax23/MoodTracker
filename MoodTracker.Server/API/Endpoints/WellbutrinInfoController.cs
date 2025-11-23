using Microsoft.AspNetCore.Mvc;
using MoodTracker.Server.API.Services;

namespace MoodTracker.Server.API.Endpoints;

[Route("api/Wellbutrin")]
[ApiController]
public class WellbutrinInfoController(WellbutrinInfoService service) : ControllerBase
{
    [HttpGet("GetWellbutrinDay/{date}")]
    public bool GetWellbutrinDay(DateTime date)
    {
        return service.IsWellbutrinDay(date);
    }
}
