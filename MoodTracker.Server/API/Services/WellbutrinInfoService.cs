using Microsoft.EntityFrameworkCore;
using MoodTracker.Server.API.DTOs;
using MoodTracker.Server.Infrasctructure;

namespace MoodTracker.Server.API.Services;

public class WellbutrinInfoService(
    ApplicationDbContext context,
    Settings settings)
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