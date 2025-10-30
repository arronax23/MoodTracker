using MoodTracker.Server.Domain.Abstractions;

namespace MoodTracker.Server.Domain;

public class Note : EntityBase
{
    private List<Medication> _medications = new List<Medication>();
    public DateOnly Date { get; private set; }
    public Mood Mood { get; private set; } = null!;


    private Note()
    {
    }


    private Note(Mood mood, IEnumerable<Medication> medications)
    {
        Mood = mood;
        _medications = medications.ToList();
    }

    public static Note Create(Mood mood, IEnumerable<Medication> medications)
    {
        return new Note(mood, medications);
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
}
