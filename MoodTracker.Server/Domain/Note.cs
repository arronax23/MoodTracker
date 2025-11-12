using MoodTracker.Server.Domain.Abstractions;

namespace MoodTracker.Server.Domain;

public class Note : EntityBase
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


    public void UpdateMedication(int medId, Medication updateMedication)
    {
        var medication = _medications.Single(m => m.Id == medId);

        medication.Update(updateMedication);
    }

    public void AddThought(Thought thought)
    {
        _thoughts.Add(thought);
    }


    public void Update(Note day)
    {
        if (day.Id != Id)
            throw new InvalidOperationException("Wrong Id");

        Update(day.Mood, day._medications);

    }

    private void Update(Mood mood, IEnumerable<Medication> medications)
    {
        Mood = mood;
        _medications.Clear();
        _medications = medications.ToList();
    }

    public IReadOnlyList<Medication> GetMedications() => _medications.AsReadOnly();
    public IReadOnlyList<Thought> GetThoughts() => _thoughts.AsReadOnly();
}
