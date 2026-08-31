namespace MoodTracker.API.Endpoints.Requests;

public class RateMoodRequest
{
    public DateOnly Date { get; set; }
    public uint MoodRate { get; set; }
}
