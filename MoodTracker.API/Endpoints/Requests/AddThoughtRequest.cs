using MoodTracker.API.DTOs;

namespace MoodTracker.API.Endpoints.Requests;

public class AddThoughtRequest
{
    public DateOnly Date { get; set; }
    public ThoughtDto Thought { get; set; } = null!;

}
