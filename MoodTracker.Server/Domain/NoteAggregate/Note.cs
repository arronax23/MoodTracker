using MoodTracker.Server.Domain.Abstractions;
using MoodTracker.Server.Domain.Models;

namespace MoodTracker.Server.Domain.NoteAggregate;

public class Note : EntityBase, IAggreateRoot
{
    private List<Medication> _medications = new List<Medication>();
    private List<Thought> _thoughts = new List<Thought>();
    public DateOnly Date { get; private set; }
    public Mood? Mood { get; private set; }

    private Note()
    {
    }

    private Note(DateOnly date)
    {   
        Date = date;
    }

    public int? GetMoodRate()
    {
        return (int?)Mood?.Rate;
    }

    public string? GetMoodColor()
    {
        return Mood?.Color.ToString();
    }

    public static Note Create(DateOnly date)
    {
        return new Note(date);
    }

    public void UpdateMood(uint moodRate)
    {
        Mood = Mood.Create(moodRate);
    }


    public void AddMedication(Medication medication)
    {
        _medications.Add(medication);
    }

    public void AddThought(Thought thought)
    {
        _thoughts.Add(thought);
    }


    public void UpdateMedication(MedicationAtData updateMedication)
    {
        var medication = _medications.Single(m => m.Id == updateMedication.Id);

        medication.Update(updateMedication);
    }

    public void UpdateThought(ThoughtData updateThought)
    {
        var thought = _thoughts.Single(t => t.Id == updateThought.Id);

        thought.Update(updateThought);
    }

    public void DeleteMedication(int medId)
    {
        var medication = _medications.Single(m => m.Id == medId);
        _medications.Remove(medication);
    }

    public void DeleteThought(int thoughtId)
    {
        var thought = _thoughts.Single(t => t.Id == thoughtId);
        _thoughts.Remove(thought);
    }

    public IReadOnlyList<Medication> GetMedications() => _medications.AsReadOnly();
    public IReadOnlyList<Thought> GetThoughts() => _thoughts.AsReadOnly();
}
