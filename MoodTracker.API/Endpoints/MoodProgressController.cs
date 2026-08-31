using Microsoft.AspNetCore.Mvc;
using MoodTracker.API.DTOs;
using MoodTracker.API.Services;

namespace MoodTracker.API.Endpoints;

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

  