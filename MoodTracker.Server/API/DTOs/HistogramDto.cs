namespace MoodTracker.Server.API.DTOs;

public class HistogramDto
{
    public IEnumerable<HistogramItemDto> Items { get; set; } = null!;

    public class HistogramItemDto
    {
        public int MoodRate { get; set; }
        public int Count { get; set; }
    }
}
