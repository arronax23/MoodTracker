using MoodTracker.Server.Domain.Abstractions;

namespace MoodTracker.Server.Domain;

public class Day : EntityBase
{
    private List<Medication> _medications = new List<Medication>();
    public Mood Mood { get; private set; } = null!;


    private Day()
    {
    }


    private Day(Mood mood, IEnumerable<Medication> medications)
    {
        Mood = mood;
        _medications = medications.ToList();
    }

    public static Day Create(Mood mood, IEnumerable<Medication> medications)
    {
        return new Day(mood, medications);
    }

    public IReadOnlyList<Medication> GetMedications() => _medications.AsReadOnly();
}
