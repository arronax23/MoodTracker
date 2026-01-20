using Microsoft.AspNetCore.Mvc;
using MoodTracker.Server.API.DTOs;
using MoodTracker.Server.API.Services;

namespace MoodTracker.Server.API.Endpoints;

[ApiController]
[Route("api/Histogram")]
public class HistogramController(HistogramService service) : ControllerBase
{
    [HttpGet("GetHistogram/{date}")]
    public HistogramDto GetHistogram(DateOnly date)
    {
        return service.GetHistogramData(date);
    }
}

  