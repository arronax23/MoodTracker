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

    public void Update(Day day)
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
