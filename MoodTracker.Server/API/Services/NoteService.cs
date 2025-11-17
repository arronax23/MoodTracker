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
            Mood = MapMoodToDto(note.Mood),
            Id = note.Id,
            Medications = note.GetMedications().OrderBy(m => m.Time).Select(m => new MedicationDto()
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
            Thoughts = note.GetThoughts().OrderBy(t => t.Time).Select(t => new ThoughtDto()
            {
                Id = t.Id,
                Text = t.Text,
                Time = t.Time.ToString("HH:mm"),
            })
        };

    }

    public MedicationDto? GetMedication(int noteId, int medicationId)
    {
        var note = dbContext.Notes
            .AsNoTracking()
            .Include("_medications")
            .SingleOrDefault(n => n.Id == noteId);

        if (note is null) 
            return null;    

        var medication = note.GetMedications().SingleOrDefault(m => m.Id == medicationId);

        if (medication is null)
            return null;

        return MapMedicationToDto(medication);
    }

    public ThoughtDto? GetThought(int noteId, int thoughtId)
    {
        var note = dbContext.Notes
            .AsNoTracking()
            .Include("_thoughts")
            .SingleOrDefault(n => n.Id == noteId);

        if (note is null)
            return null;

        var thought = note.GetThoughts().SingleOrDefault(t => t.Id == thoughtId);

        if (thought is null)
            return null;

        return MapThoughtToDto(thought);
    }


    public bool EditMedication(int noteId, MedicationDto dto)
    {
        var note = dbContext.Notes
            .Include("_medications")
            .SingleOrDefault(n => n.Id == noteId);

        if (note is null)
            return false;

        note.UpdateMedication(dto.Id, MapMedicationFromDto(dto));

        return dbContext.SaveChanges() > 0;
    }

    public async Task<bool> EditThought(int noteId, ThoughtDto dto)
    {
        var note = dbContext.Notes
            .Include("_thoughts")
            .SingleOrDefault(n => n.Id == noteId);

        if (note is null)
            return false;

        note.UpdateThought(dto.Id, MapThoughtFromDto(dto));

        return await dbContext.SaveChangesAsync() > 0;
    }

    public bool DeleteMedication(int noteId, int medicationId)
    {
        var note = dbContext.Notes
            .Include("_medications")
            .SingleOrDefault(n => n.Id == noteId);

        if (note is null)
            return false;

        note.DeleteMedication(medicationId);

        return dbContext.SaveChanges() > 0;
    }


    public bool DeleteThought(int noteId, int thoughtId)
    {
        var note = dbContext.Notes
            .Include("_thoughts")
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
        => Medication.Create(TimeOnly.Parse(dto.Time), dto.Name, Medication.Dosage.Create(dto.Dose.Value, dto.Dose.Unit));

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

    private Thought MapThoughtFromDto(ThoughtDto dto) => Thought.Create(TimeOnly.Parse(dto.Time), dto.Text);

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
