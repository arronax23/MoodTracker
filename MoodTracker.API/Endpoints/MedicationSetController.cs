using Microsoft.AspNetCore.Mvc;
using MoodTracker.API.DTOs;
using MoodTracker.API.Endpoints.Requests;
using MoodTracker.API.Services;

namespace MoodTracker.API.Endpoints;

[ApiController]
[Route("api/MedicationSet")]
public class MedicationSetController(MedicationSetService medicationSetService) : ControllerBase
{
    [HttpGet("GetSets")]
    public IEnumerable<MedicationSetDto> GetSets()
    {
        return medicationSetService.GetSets();
    }

    [HttpGet("GetSet/{id}")]
    public MedicationSetDto? GetSet(int id)
    {
        return medicationSetService.GetSet(id);
    }


    [HttpPost("AddSet")]
    public IActionResult AddSet(MedicationSetDto dto)
    {
        medicationSetService.AddSet(dto);

        return Ok();
    }

    [HttpPatch("UpdateSet")]
    public IActionResult UpdateSet(UpdateSetRequest request)
    {
        var isSuccess = medicationSetService.UpdateSet(request.Set);

        if (isSuccess)
            return Ok();
        else
            return BadRequest();
    }


    [HttpDelete("DeleteSet")]
    public IActionResult DeleteSet(DeleteSetRequest request)
    {
        var isSuccess = medicationSetService.DeleteSet(request.SetId);

        if (isSuccess)
            return Ok();
        else
            return BadRequest();
    }

}
