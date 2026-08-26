using Microsoft.EntityFrameworkCore;
using MoodTracker.Server.API.DTOs;
using MoodTracker.Server.Domain;
using MoodTracker.Server.Domain.Models;
using MoodTracker.Server.Domain.NoteAggregate;
using MoodTracker.Server.Infrasctructure;

namespace MoodTracker.Server.API.Services;

public class NoteService(ApplicationDbContext dbContext)
{
    public NoteDto GetNote(DateOnly date)
    {
        var note = dbContext.Notes
            .AsNoTracking()
            .Include(n => n.Medications)
            .Include(n => n.Thoughts)
            .SingleOrDefault(n => n.Date == date);

        if (note == null)
            return new NoteDto();

        return new NoteDto()
        {
            Date = note.Date,
            Mood = MapMoodToDto(note.Mood),
            Id = note.Id,
            Medications = note.Medications.OrderBy(m => m.Time).Select(m => new MedicationDto()
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
            Thoughts = note.Thoughts.OrderBy(t => t.Time).Select(t => new ThoughtDto()
            {
                Id = t.Id,
                Text = t.Text,
                Time = t.Time.ToString("HH:mm"),
            })
        };

    }

    public int? GetMoodRate(DateOnly date)
    {
        var note = dbContext.Notes
            .AsNoTracking()
            .SingleOrDefault(n => n.Date == date);

        if (note is null || note.Mood is null)
            return null;

        return (int)note.Mood.Rate;
    }



    public MedicationDto? GetMedication(int noteId, int medicationId)
    {
        var note = dbContext.Notes
            .AsNoTracking()
            .Include(n => n.Medications)
            .SingleOrDefault(n => n.Id == noteId);

        if (note is null) 
            return null;    

        var medication = note.Medications.SingleOrDefault(m => m.Id == medicationId);

        if (medication is null)
            return null;

        return MapMedicationToDto(medication);
    }

    public ThoughtDto? GetThought(int noteId, int thoughtId)
    {
        var note = dbContext.Notes
            .AsNoTracking()
            .Include(n => n.Thoughts)
            .SingleOrDefault(n => n.Id == noteId);

        if (note is null)
            return null;

        var thought = note.Thoughts.SingleOrDefault(t => t.Id == thoughtId);

        if (thought is null)
            return null;

        return MapThoughtToDto(thought);
    }


    public bool EditMedication(int noteId, MedicationDto dto)
    {
        var note = dbContext.Notes
            .Include(n => n.Medications)
            .SingleOrDefault(n => n.Id == noteId);

        if (note is null)
            return false;

        note.UpdateMedication(MapMedicationAtFromDto(dto));

        return dbContext.SaveChanges() > 0;
    }

    public async Task<bool> EditThought(int noteId, ThoughtDto dto)
    {
        var note = dbContext.Notes
            .Include(n => n.Thoughts)
            .SingleOrDefault(n => n.Id == noteId);

        if (note is null)
            return false;

        note.UpdateThought(MapThoughtFromDto(dto));

        return await dbContext.SaveChangesAsync() > 0;
    }

    public bool DeleteMedication(int noteId, int medicationId)
    {
        var note = dbContext.Notes
            .Include(n => n.Medications)
            .SingleOrDefault(n => n.Id == noteId);

        if (note is null)
            return false;

        note.DeleteMedication(medicationId);

        return dbContext.SaveChanges() > 0;
    }


    public bool DeleteThought(int noteId, int thoughtId)
    {
        var note = dbContext.Notes
            .Include(n => n.Thoughts)
            .SingleOrDefault(n => n.Id == noteId);

        if (note is null)
            return false;

        note.DeleteThought(thoughtId);

        return dbContext.SaveChanges() > 0;
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

    public bool AddMedicationsFromSet(DateOnly noteDate, string time, int medicationSetId)
    {
        var note = dbContext.Notes.SingleOrDefault(n => n.Date == noteDate);
        var set = dbContext.MedicationSets.Include(n => n.Medications).SingleOrDefault(ms => ms.Id == medicationSetId);

        if (note is null)
            note = Note.Create(noteDate);

        if (set is null)
            return false;   

        foreach (var medication in set.GetMedications())
            note.AddMedication(Medication.Create(TimeOnly.Parse(time), medication.Name, medication.Dose));

        dbContext.Notes.Update(note);

        return dbContext.SaveChanges() > 0;
    }   

    public void AddThought(DateOnly date, ThoughtDto thought)
    {
        var dbNote = dbContext.Notes.SingleOrDefault(n => n.Date == date);

        if (dbNote is not null)
            dbNote.AddThought(Thought.Create(TimeOnly.Parse(thought.Time), thought.Text));
        else
        {
            var note = Note.Create(date);
            note.AddThought(Thought.Create(TimeOnly.Parse(thought.Time), thought.Text));
            dbContext.Notes.Add(note);
        }

        dbContext.SaveChanges();
    }

    private MoodDto? MapMoodToDto(Mood? mood)
    {
        if (mood is null)
            return null;

        return new MoodDto()
        {
            Rate = (int)mood.Rate,
            Color = mood.Color.ToString()
        };
    }

    private Medication MapMedicationFromDto(MedicationDto dto)
        => Medication.Create(TimeOnly.Parse(dto.Time), dto.Name, Dosage.Create(dto.Dose.Value, dto.Dose.Unit));

    private MedicationAtData MapMedicationAtFromDto(MedicationDto dto) => new MedicationAtData()
    {
        Id = dto.Id,
        Name = dto.Name,
        Time = TimeOnly.Parse(dto.Time),
        Dosage = Dosage.Create(dto.Dose.Value, dto.Dose.Unit)
    };

    private MedicationDto MapMedicationToDto(Medication medication)
    {
        return new MedicationDto()
        {
            Id = medication.Id,
            Name = medication.Name,
            Time = medication.Time.ToString(),
            Dose = new DosageDto()
            {
                Value = medication.Dose.Value,
                Unit = medication.Dose.Unit
            }
        };
    }

    private ThoughtData MapThoughtFromDto(ThoughtDto dto) => new ThoughtData() 
    {
        Id = dto.Id,
        Time = TimeOnly.Parse(dto.Time),
        Text = dto.Text
    };

    private ThoughtDto MapThoughtToDto(Thought thought)
    {
        return new ThoughtDto()
        {
            Id = thought.Id,
            Text = thought.Text,
            Time = thought.Time.ToString(),
        };
    }
}
