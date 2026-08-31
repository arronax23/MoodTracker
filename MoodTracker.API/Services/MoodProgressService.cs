using MoodTracker.API.Abstractions;
using MoodTracker.API.DTOs;
using System.Globalization;

namespace MoodTracker.API.Services;

public class MoodProgressService(IApplicationDbContext dbContext)
{
    public MoodProgressDto GetProgress(DateOnly date)
    {
        var days = GetDaysInMonth(date);

        var moodRates = dbContext.Notes.Where(n => days.Contains(n.Date)).Select(n => new MoodProgressItemData()
        {
            Date = n.Date,
            Day = n.Date.Day,
            MoodRate = n.GetMoodRate(),
            MoodColor = n.GetMoodColor()
        });

        List<MoodProgressDto.MoodProgressItemDto> progress = new();

        foreach (var day in days)
        {
            var moodRate = moodRates.SingleOrDefault(mr => mr.Date == day);

            if (moodRate is not null)
                progress.Add(moodRate);
            else
                progress.Add(new MoodProgressDto.MoodProgressItemDto()
                {
                    Day = day.Day,
                    MoodRate = null,
                    MoodColor = null
                });
        }

        return new MoodProgressDto() 
        {
            Progress = progress,
            Month = GetMonthNameInPolish(date),
            Year = date.Year    
        };
    }

    private string GetMonthNameInPolish(DateOnly date)
    {
        var monthName = date.ToString("MMMM", new CultureInfo("pl-PL"));
        
        return char.ToUpper(monthName[0]) + monthName.Substring(1);
    }

    private IEnumerable<DateOnly> GetDaysInMonth(DateOnly date)
    {
        int daysInMonth = DateTime.DaysInMonth(date.Year, date.Month);

        return Enumerable
            .Range(1, daysInMonth)
            .Select(day => new DateOnly(date.Year, date.Month, day));
    }

    private class MoodProgressItemData : MoodProgressDto.MoodProgressItemDto
    {
        public DateOnly Date { get; set; }
    }
}