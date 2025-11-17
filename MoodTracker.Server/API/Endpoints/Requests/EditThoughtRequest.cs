using MoodTracker.Server.API.DTOs;
namespace MoodTracker.Server.API.Endpoints.Requests;

public class EditThoughtRequest
{
    public int NoteId { get; set; }
    public ThoughtDto Thought { get; set; } = null!;
}
