namespace MoodTracker.Server.API.DTOs;

public class ThoughtDto
{
    public TimeOnly Time { get; set; }
    public string Text { get; set; } = null!;
}
