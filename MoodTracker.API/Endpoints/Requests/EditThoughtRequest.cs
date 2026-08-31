using MoodTracker.API.DTOs;
namespace MoodTracker.API.Endpoints.Requests;

public class EditThoughtRequest
{
    public int NoteId { get; set; }
    public ThoughtDto Thought { get; set; } = null!;
}
