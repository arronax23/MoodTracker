using Microsoft.EntityFrameworkCore;
using MoodTracker.API.Abstractions;
using MoodTracker.API.DTOs;
using MoodTracker.Domain;
using MoodTracker.Domain.MedicationSetAggregate;
using MoodTracker.Domain.Models;

namespace MoodTracker.API.Services;

public class MedicationSetService(IApplicationDbContext dbContext)
{
    public IEnumerable<MedicationSetDto> GetSets()
    {
        var sets = dbContext.MedicationSets
            .AsNoTracking()
            .Include(n => n.Medications)
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

    public MedicationSetDto? GetSet(int id)
    {
        var set = dbContext.MedicationSets
            .AsNoTracking() 
            .Include(n => n.Medications)
            .SingleOrDefault(s => s.Id == id);

        if (set is null)
            return null;

        return new MedicationSetDto()
        {
            Id = set.Id,
            Name = set.Name,
            Meds = set.GetMedications().Select(m => new MedDto()
            {
                Id = m.Id,
                Name = m.Name,
                Dose = new DosageDto()
                {
                    Value = m.Dose.Value,
                    Unit = m.Dose.Unit
                }
            })
        };      

    }
    public void AddSet(MedicationSetDto dto)
    {
        var set = MedicationSet.Create(dto.Name);

        set.AddMedications(dto.Meds.Select(m => Med.Create(m.Name, Dosage.Create(m.Dose.Value, m.Dose.Unit))));

        dbContext.MedicationSets.Add(set);
        dbContext.SaveChanges();
    }

    public bool UpdateSet(MedicationSetDto dto)
    {
        var set = dbContext.MedicationSets.Include(n => n.Medications).SingleOrDefault(s => s.Id == dto.Id);

        if (set is null)
            return false;

        set.Update(dto.Name, dto.Meds.Select(MapMedDataFromMedDto));

        //var entries = dbContext.ChangeTracker.Entries().ToList();

        return dbContext.SaveChanges() > 0;
    }

    public bool DeleteSet(int id)
    {
        var set = dbContext.MedicationSets
            .Include(n => n.Medications)
            .SingleOrDefault(s => s.Id == id);

        if (set is null)
            return false;

        dbContext.MedicationSets.Remove(set);
        return dbContext.SaveChanges() > 0;
    }

    private MedicationData MapMedDataFromMedDto(MedDto dto)
    {
        return new MedicationData()
        {
            Id = dto.Id,
            Name = dto.Name,
            Dosage = Dosage.Create(dto.Dose.Value, dto.Dose.Unit)
        };
    }
}
