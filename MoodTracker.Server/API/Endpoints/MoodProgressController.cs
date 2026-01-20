using Microsoft.AspNetCore.Mvc;
using MoodTracker.Server.API.DTOs;
using MoodTracker.Server.API.Services;

namespace MoodTracker.Server.API.Endpoints;

[ApiController]
[Route("api/MoodProgress")]
public class MoodProgressController(MoodProgressService service) : ControllerBase
{
    [HttpGet("GetProgress/{date}")]
    public MoodProgressDto GetProgress(DateOnly date)
    {
        return service.GetProgress(date);
    }
}

  