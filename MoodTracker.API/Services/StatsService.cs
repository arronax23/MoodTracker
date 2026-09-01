using Microsoft.EntityFrameworkCore;
using MoodTracker.API.Abstractions;
using MoodTracker.API.DTOs;
using System.Globalization;

namespace MoodTracker.API.Services;

public class StatsService(IApplicationDbContext dbContext)
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
            })
            .OrderByDescending(dto => dto.Count)
            .ToList();


        foreach (var item in generalMeds)
        {
            var detailedMeds = validMeds
                .Where(m => m.Name == item.MedicationName)
                .GroupBy(med => new { med.Name, med.Dose.Value, med.Dose.Unit })
                .Select(gr => new MedWithDoseData()
                {
                    Name = gr.Key.Name,
                    DoseValue = gr.Key.Value,
                    DoseUnit = gr.Key.Unit,
                    Count = gr.Count()
                })
                .ToList()
                .Select(data => new MedWithDoseDto()
                {
                    MedicationName = $"{data.Name} {FormatDoseValue(data.DoseValue)}{data.DoseUnit}",
                    Count = data.Count
                })
                .OrderByDescending(dto => dto.Count);


            item.MedicationWithDose = new(detailedMeds);
        }

        return generalMeds;
    }

    
    public IEnumerable<MedCountForTimePeriodDto> GetMedCountForTimePeriod_Fast(DateOnly startDate, DateOnly endDate)
    {
        return dbContext.MedCounts
            .AsNoTracking()
            .Where(mc => mc.Parent == null)
            .Select(mc => new MedCountForTimePeriodDto()
            {
                Count = mc.Count,
                MedicationName = mc.MedicationName,
                MedicationWithDose = mc.Children.Select(child => new MedWithDoseDto()
                {
                    MedicationName = child.MedicationName,
                    Count = child.Count
                })
                .ToList()
            });
    }


    private string FormatDoseValue(decimal doseValue)
    {
        if (doseValue == decimal.Truncate(doseValue))
            return ((int)doseValue).ToString();

        return doseValue.ToString(CultureInfo.InvariantCulture);
        
    }


    private class MedWithDoseData
    {
        public string Name { get; set; } = null!;
        public decimal DoseValue { get; set; } 
        public string DoseUnit { get; set; } = null!;
        public int Count { get; set; }
    }
}
