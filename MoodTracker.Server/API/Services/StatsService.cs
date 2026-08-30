using Microsoft.EntityFrameworkCore;
using MoodTracker.Server.API.DTOs;
using MoodTracker.Server.Infrasctructure;

namespace MoodTracker.Server.API.Services;

public class StatsService(ApplicationDbContext dbContext)
{
   public IEnumerable<MedCountForTimePeriodDto> GetMedCountForTimePeriod(DateOnly startDate, DateOnly endDate)
   {
        var validMeds = dbContext.Notes
            .AsNoTracking()
            .Where(n => n.Date >= startDate && n.Date <= endDate)
            .SelectMany(n => n.Medications);


        var generalMeds = validMeds
            .GroupBy(med => new { med.Name })
            .Select(g => new MedCountForTimePeriodDto()
            {
                Count = g.Count(),
                MedicationName = $"{g.Key.Name}",
            }).ToList();


        foreach (var item in generalMeds)
        {
            var detailedMeds = validMeds
                .Where(m => m.Name == item.MedicationName)
                .GroupBy(med => new { med.Name, med.Dose.Value, med.Dose.Unit })
                .Select(gr => new MedWithDoseDto()
                {
                    MedicationName = $"{gr.Key.Name} {gr.Key.Value}{gr.Key.Unit}",
                    Count = gr.Count()
                });

            item.MedicationWithDose = new(detailedMeds);
        }

        return generalMeds;
   }
}
