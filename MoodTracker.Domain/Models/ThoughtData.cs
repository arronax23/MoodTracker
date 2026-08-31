namespace MoodTracker.Domain.Models;

public class ThoughtData
{
    public int Id { get; set; }
    public TimeOnly Time { get; set; }
    public string Text { get; set; } = null!;
}
