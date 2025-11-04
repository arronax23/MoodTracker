using Microsoft.AspNetCore.Mvc;
using MoodTracker.Server.API.DTOs;
using MoodTracker.Server.API.Endpoints.Requests;
using MoodTracker.Server.API.Services;

namespace MoodTracker.Server.API.Endpoints;

[ApiController]
[Route("api/Notes")]
public class NoteController(NoteService noteService) : ControllerBase
{

    [HttpGet("GetNote/{date}")]
    public NoteDto GetNote(DateOnly date)
    {
        return noteService.GetNote(date);
    }

    [HttpPut("RateMood")]
    public IActionResult RateMood(RateMoodRequest request)
    {
        noteService.RateMood(request.Date, request.MoodRate);

        return Ok();
    }

    [HttpPut("AddMedication")]
    public IActionResult AddMedication(AddMedicationRequest request)
    {
        noteService.AddMedication(request.Date, request.Medication);

        return Ok();
    }

    [HttpPut("AddThought")]
    public IActionResult AddThought(AddThoughtRequest request)
    {
        noteService.AddThought(request.Date, request.Thought);

        return Ok();
    }
}
