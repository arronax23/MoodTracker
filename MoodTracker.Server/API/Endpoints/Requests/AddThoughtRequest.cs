using MoodTracker.Server.API.DTOs;

namespace MoodTracker.Server.API.Endpoints.Requests;

public class AddThoughtRequest
{
    public DateOnly Date { get; set; }
    public ThoughtDto Thought { get; set; } = null!;

}
