using MoodTracker.Server.API.DTOs;
using MoodTracker.Server.Domain;
using MoodTracker.Server.Infrasctructure;
using static MoodTracker.Server.Domain.Medication;

namespace MoodTracker.Server.API.Services;

public class NoteService(ApplicationDbContext dbContext)
{
    public void Save(DayDto dto)
    {
        var mood = Mood.Create(dto.Moodrate);
        var medications = dto.Medications.Select(m => Medication.Create(m.Name, Dosage.Create(m.Dose.Value, m.Dose.Unit)));

        var day = Note.Create(mood, medications);

        if (dto.Id == 0)
            Add(day);
        else
            Update(day);

        dbContext.SaveChanges();
    }

    private void Add(Note day) => dbContext.Add(day);
    
    private void Update(Note day)
    {
        var dbDay = dbContext.Notes.SingleOrDefault(d => d.Id == day.Id);

        if (dbDay is null)
            throw new ArgumentException("Wrong Day Id in Update");

        dbDay.Update(day);
    }
}
