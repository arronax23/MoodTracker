using Microsoft.AspNetCore.Mvc;
using MoodTracker.Server.API.DTOs;
using MoodTracker.Server.API.Services;

namespace MoodTracker.Server.API.Endpoints;

[ApiController]
[Route("Notes")]
public class NoteController(NoteService noteService) : ControllerBase
{
    [HttpPut("RateMood")]
    public IActionResult RateMood(DateOnly date, uint moodRate)
    {
        noteService.RateMood(date, moodRate);

        return Ok();
    }

    [HttpPut("AddMedication")]
    public IActionResult AddMedication(DateOnly date, MedicationDto medication)
    {
        noteService.AddMedication(date, medication);

        return Ok();
    }

    [HttpPut("AddThought")]
    public IActionResult AddThought(DateOnly date, ThoughtDto thought)
    {
        noteService.AddThought(date, thought);

        return Ok();
    }
}
