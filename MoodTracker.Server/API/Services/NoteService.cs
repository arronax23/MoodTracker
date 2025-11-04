using Microsoft.EntityFrameworkCore;
using MoodTracker.Server.API.DTOs;
using MoodTracker.Server.Domain;
using MoodTracker.Server.Infrasctructure;

namespace MoodTracker.Server.API.Services;

public class NoteService(ApplicationDbContext dbContext)
{
    public NoteDto GetNote(DateOnly date)
    {
        var note = dbContext.Notes
            .AsNoTracking()
            .Include("_medications")
            .Include("_thoughts")
            .SingleOrDefault(n => n.Date == date);

        if (note == null)
            return new NoteDto();

        return new NoteDto()
        {
            Date = note.Date,
            MoodRate = note.GetMoodRate(),
            Id = note.Id,
            Medications = note.GetMedications().Select(m => new MedicationDto()
            {
                Id = m.Id,
                Name = m.Name,
                Time = m.Time.ToString("HH:mm"),
                Dose = new DosageDto()
                {
                    Value = m.Dose.Value,
                    Unit = m.Dose.Unit
                }
            }),
            Thoughts = note.GetThoughts().Select(t => new ThoughtDto()
            {
                Id = t.Id,
                Text = t.Text,
                Time = t.Time.ToString("HH:mm"),
            })
        };

    }
    public void RateMood(DateOnly date, uint moodRate)
    {
        var dbNote = dbContext.Notes.SingleOrDefault(n => n.Date == date);

        if (dbNote is not null)
            dbNote.UpdateMood(moodRate);
        else
        {
            var note = Note.Create(date);
            note.UpdateMood(moodRate);
            dbContext.Notes.Add(note);
        }

        dbContext.SaveChanges();
    }

    public void AddMedication(DateOnly date, MedicationDto medication)
    {
        var dbNote = dbContext.Notes.SingleOrDefault(n => n.Date == date);

        if (dbNote is not null)
            dbNote.AddMedication(MapMedicationFromDto(medication));
        else
        {
            var note = Note.Create(date);
            note.AddMedication(MapMedicationFromDto(medication));
            dbContext.Notes.Add(note);
        }

        dbContext.SaveChanges();
    }

    public void AddThought(DateOnly date, ThoughtDto thought)
    {
        var dbNote = dbContext.Notes.SingleOrDefault(n => n.Date == date);

        if (dbNote is not null)
            dbNote.AddThought(MapThoughtFromDto(thought));
        else
        {
            var note = Note.Create(date);
            note.AddThought(MapThoughtFromDto(thought));
            dbContext.Notes.Add(note);
        }

        dbContext.SaveChanges();
    }

    private Medication MapMedicationFromDto(MedicationDto dto)
        => Medication.Create(TimeOnly.Parse(dto.Time), dto.Name, Medication.Dosage.Create(dto.Dose.Value, dto.Dose.Unit));

    private Thought MapThoughtFromDto(ThoughtDto dto) => Thought.Create(TimeOnly.Parse(dto.Time), dto.Text);




    //public void Save(DayDto dto)
    //{
    //    var mood = Mood.Create(dto.Moodrate);
    //    var medications = dto.Medications.Select(m => Medication.Create(m.Name, Dosage.Create(m.Dose.Value, m.Dose.Unit)));

    //    var day = Note.Create(mood, medications);

    //    if (dto.Id == 0)
    //        Add(day);
    //    else
    //        Update(day);

    //    dbContext.SaveChanges();
    //}

    //private void Add(Note day) => dbContext.Add(day);

    //private void Update(Note day)
    //{
    //    var dbDay = dbContext.Notes.SingleOrDefault(d => d.Id == day.Id);

    //    if (dbDay is null)
    //        throw new ArgumentException("Wrong Day Id in Update");

    //    dbDay.Update(day);
    //}
}
