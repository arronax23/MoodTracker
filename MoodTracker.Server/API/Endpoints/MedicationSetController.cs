using Microsoft.AspNetCore.Mvc;
using MoodTracker.Server.API.DTOs;
using MoodTracker.Server.API.Endpoints.Requests;
using MoodTracker.Server.API.Services;

namespace MoodTracker.Server.API.Endpoints;

[ApiController]
[Route("api/MedicationSet")]
public class MedicationSetController(MedicationSetService medicationSetService) : ControllerBase
{
    [HttpGet("GetSets")]
    public IEnumerable<MedicationSetDto> GetSets()
    {
        return medicationSetService.GetSets();
    }


    [HttpPost("AddSet")]
    public IActionResult AddSet(MedicationSetDto dto)
    {
        medicationSetService.AddSet(dto);

        return Created();
    }

    [HttpDelete("DeleteSet")]
    public IActionResult DeleteSet(DeleteSetRequest request)
    {
        var isSuccess = medicationSetService.DeleteSet(request.SetId);

        if (isSuccess)
            return Ok();
        else
            return Problem();
    }

}
