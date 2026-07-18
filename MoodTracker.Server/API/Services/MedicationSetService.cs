using Microsoft.EntityFrameworkCore;
using MoodTracker.Server.API.DTOs;
using MoodTracker.Server.Domain;
using MoodTracker.Server.Domain.MedicationSetAggregate;
using MoodTracker.Server.Infrasctructure;

namespace MoodTracker.Server.API.Services;

public class MedicationSetService(ApplicationDbContext dbContext)
{
    public IEnumerable<MedicationSetDto> GetSets()
    {
        var sets = dbContext.MedicationSets
            .AsNoTracking()
            .Include("_medications")
            .ToList();

        return sets.Select(s => new MedicationSetDto()
        {
            Id = s.Id,
            Name = s.Name,
            Meds = s.GetMedications().Select(m => new MedDto()
            {
                Id = m.Id,
                Name = m.Name,
                Dose = new DosageDto()
                {
                    Value = m.Dose.Value,
                    Unit = m.Dose.Unit
                }
            })
        });
    }


    public void AddSet(MedicationSetDto dto)
    {
        var set = MapSetFromDto(dto);
        set.AddMedications(dto.Meds.Select(MapMedFromDto));

        dbContext.MedicationSets.Add(set);
        dbContext.SaveChanges();
    }

    public bool DeleteSet(int id)
    {
        var set = dbContext.MedicationSets
            .Include("_medications")
            .SingleOrDefault(s => s.Id == id);

        if (set is null)
            return false;

        dbContext.MedicationSets.Remove(set);
        return dbContext.SaveChanges() > 0 ;
    }   


    private MedicationSet MapSetFromDto(MedicationSetDto dto) => MedicationSet.Create(dto.Name);
    private Med MapMedFromDto(MedDto dto) => Med.Create(dto.Name, Dosage.Create(dto.Dose.Value, dto.Dose.Unit));
}
