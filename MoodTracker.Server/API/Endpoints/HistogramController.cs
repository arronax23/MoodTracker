using Microsoft.AspNetCore.Mvc;
using MoodTracker.Server.API.DTOs;
using MoodTracker.Server.API.Services;

namespace MoodTracker.Server.API.Endpoints;

[ApiController]
[Route("api/Histogram")]
public class HistogramController(HistogramService service) : ControllerBase
{
    [HttpGet("GetMoodRateHistogram/{date}")]
    public MoodRateHistogramDto GetMoodRateHistogram(DateOnly date)
    {
        return service.GetMoodRateHistogram(date);
    }

    [HttpGet("GetMoodColorHistogram/{date}")]
    public MoodColorHistogramDto GetMoodColorHistogram(DateOnly date)
    {
        return service.GetMoodColorHistogram(date);
    }
}

  