using static MoodTracker.Server.API.DTOs.MoodColorHistogramDto;

namespace MoodTracker.Server.API.DTOs;

public class MoodRateHistogramDto
{
    public IEnumerable<MoodRateHistogramItemDto> Items { get; set; } = null!;
    public string Month { get; set; } = null!;
    public int Year { get; set; }

    public class MoodRateHistogramItemDto : HistogramItemDto
    {
        public int MoodRate { get; set; }
    }
}
