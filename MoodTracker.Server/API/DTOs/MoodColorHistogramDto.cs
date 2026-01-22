namespace MoodTracker.Server.API.DTOs;

public class MoodColorHistogramDto
{
    public IEnumerable<HistogramItemDto> Items { get; set; } = null!;
    public string Month { get; set; } = null!;
    public int Year { get; set; }

    public class HistogramItemDto
    {
        public string MoodColor { get; set; } = null!;
        public int Count { get; set; }
    }
}
