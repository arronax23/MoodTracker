using MoodTracker.Server.API.DTOs;
using MoodTracker.Server.Domain;
using MoodTracker.Server.Infrasctructure;
using System.Linq;
using System.Linq.Expressions;

namespace MoodTracker.Server.API.Services;

public class HistogramService(ApplicationDbContext dbContext)
{
    public HistogramDto GetHistogramData(DateOnly date)
    {
        var items = dbContext.Notes
            .Where(NoteIsWithinSpecifiedDate(date))
            .Where(n => n.Mood != null)
            .GroupBy(n => (int)n.Mood!.Rate)
            .Select(g => new HistogramDto.HistogramItemDto()
            {
                MoodRate = g.Key,
                Count = g.Count()
            });

        return new HistogramDto() { Items = items };
    }

    private Expression<Func<Note,bool>> NoteIsWithinSpecifiedDate(DateOnly date) 
        => (n) => n.Date.Month == date.Month && n.Date.Year == date.Year;
}
