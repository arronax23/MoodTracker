using Microsoft.EntityFrameworkCore;
using MoodTracker.API.Abstractions;
using MoodTracker.API.DTOs;

namespace MoodTracker.API.Services;

public class WellbutrinInfoService(
    IApplicationDbContext context,
    ISettings settings)
{
    public bool IsWellbutrinDay(DateTime date) => (date - settings.WellbutrinReferenceDay).TotalDays % 2 == 0;
    public RatingByWellbutrinDayDto GetRatingByWellbutrinDay()
    {
        var data = context.Notes
            .AsNoTracking()
            .ToList()
            .Where(n => n.Mood != null)
            .GroupBy(n => IsWellbutrinDay(n.Date.ToDateTime(TimeOnly.MinValue)))
            .Select(ng => new RatingData()
            {
                IsWellbutrinDay = ng.Key,
                Rating = ng.Average(n => n.GetMoodRate()!.Value)
            });

        return new RatingByWellbutrinDayDto()
        {
            WellbutrinDayRating = data.Single(d => d.IsWellbutrinDay).Rating,
            NotWellbutrinDayRating = data.Single(d => !d.IsWellbutrinDay).Rating,
        };  
    }

    private class RatingData
    {
        public bool IsWellbutrinDay { get; set; }
        public double Rating { get; set; }
    }   
}