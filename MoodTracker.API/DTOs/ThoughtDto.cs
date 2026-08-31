namespace MoodTracker.API.DTOs;

public class ThoughtDto
{
    public int Id { get; set; }
    public string Time { get; set; } = null!;
    public string Text { get; set; } = null!;
}
