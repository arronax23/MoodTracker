using static MoodTracker.API.DTOs.MoodColorHistogramDto;

namespace MoodTracker.API.DTOs;

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
