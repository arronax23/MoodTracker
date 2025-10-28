using MoodTracker.Server.Domain.Abstractions;

namespace MoodTracker.Server.Domain;

public class Day : EntityBase
{
    private List<Medication> _medications = new List<Medication>();
    public IReadOnlyList<Medication> Medications => _medications.AsReadOnly();
    public Mood Mood { get; private set; } = null!;

    private Day(Mood mood, IEnumerable<Medication> medications)
    {
        Mood = mood;
        _medications = medications.ToList();
    }

    public static Day Create(Mood mood, IEnumerable<Medication> medications)
    {
        return new Day(mood, medications);
    }
}
