using Microsoft.AspNetCore.Mvc;
using MoodTracker.API.DTOs;
using MoodTracker.API.Services;

namespace MoodTracker.API.Endpoints;

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

  