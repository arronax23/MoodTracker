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

    [HttpGet("GetMedication/{noteId}/{medicationId}")]
    public MedicationDto? GetMedication(int noteId, int medicationId)
    {
        return noteService.GetMedication(noteId,medicationId);
    }

    [HttpGet("GetThought/{noteId}/{thoughtId}")]
    public ThoughtDto? GetThought(int noteId, int thoughtId)
    {
        return noteService.GetThought(noteId, thoughtId);
    }

    [HttpPatch("EditMedication")]
    public IActionResult EditMedication(EditMedicationRequest request)
    {
        var isSuccess = noteService.EditMedication(request.NoteId, request.Medication);

        if (isSuccess)
            return Ok();
        else
            return Problem();
    }

    [HttpPatch("EditThought")]
    public async Task<IActionResult> EditThought(EditThoughtRequest request)
    {
        var isSuccess = await noteService.EditThought(request.NoteId, request.Thought);

        if (isSuccess)
            return Ok();
        else
            return Problem();
    }

    [HttpDelete("DeleteMedication")]
    public IActionResult DeleteMedication(DeleteMedicationRequest request)
    {
        var isSuccess = noteService.DeleteMedication(request.NoteId, request.MedicationId);

        if (isSuccess)
            return Ok();
        else
            return Problem();
    }

    [HttpDelete("DeleteThought")]
    public IActionResult DeleteThought(DeleteThoughtRequest request)
    {
        var isSuccess = noteService.DeleteThought(request.NoteId, request.ThoughtId);

        if (isSuccess)
            return Ok();
        else
            return Problem();
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
