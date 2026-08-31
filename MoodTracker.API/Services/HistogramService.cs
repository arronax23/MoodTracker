using MoodTracker.API.Abstractions;
using MoodTracker.API.DTOs;
using MoodTracker.Domain.NoteAggregate;
using System.Globalization;
using System.Linq.Expressions;
using static MoodTracker.API.DTOs.MoodColorHistogramDto;
using static MoodTracker.API.DTOs.MoodRateHistogramDto;

namespace MoodTracker.API.Services;

public class HistogramService(IApplicationDbContext dbContext)
{
    public MoodRateHistogramDto GetMoodRateHistogram(DateOnly date)
    {
        var items = dbContext.Notes
            .Where(NoteIsWithinSpecifiedDate(date))
            .Where(n => n.Mood != null)
            .GroupBy(n => new { Rate = (int)n.Mood!.Rate, Color = n.Mood!.Color.ToString() })
            .Select(g => new MoodRateHistogramItemDto()
            {
                MoodRate = g.Key.Rate,
                MoodColor = g.Key.Color,
                Count = g.Count()
            })
            .OrderByDescending(x => x.Count);

        return new MoodRateHistogramDto() 
        { 
            Items = items,
            Month = GetMonthNameInPolish(date),
            Year = date.Year
        };
    }

    public MoodColorHistogramDto GetMoodColorHistogram(DateOnly date)
    {
        var items = dbContext.Notes
            .Where(NoteIsWithinSpecifiedDate(date))
            .Where(n => n.Mood != null)
            .GroupBy(n => n.Mood!.Color.ToString())
            .Select(g => new HistogramItemDto()
            {
                MoodColor = g.Key,
                Count = g.Count()
            })
            .OrderByDescending(x => x.Count);

        return new MoodColorHistogramDto()
        {
            Items = items,
            Month = GetMonthNameInPolish(date),
            Year = date.Year
        };
    }


    private Expression<Func<Note,bool>> NoteIsWithinSpecifiedDate(DateOnly date) 
        => (n) => n.Date.Month == date.Month && n.Date.Year == date.Year;

    private string GetMonthNameInPolish(DateOnly date)
    {
        var monthName = date.ToString("MMMM", new CultureInfo("pl-PL"));

        return char.ToUpper(monthName[0]) + monthName.Substring(1);
    }




}
