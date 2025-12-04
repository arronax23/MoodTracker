namespace MoodTracker.Server.API.DTOs;

public class MoodProgressDto
{
    public IEnumerable<MoodProgressItemDto> Progress { get; set; } = null!;
    public string Month { get; set; } = null!;
    public int Year { get; set; }

    public class MoodProgressItemDto
    {
        public int Day { get; set; }
        public int? MoodRate { get; set; }
        public string? MoodColor { get; set; }
    }
}
