using MoodTracker.Domain.Abstractions;

namespace MoodTracker.Domain.MedicationSetAggregate;

public class Med : EntityBase
{
    public string Name { get; private set; } = null!;
    public Dosage Dose { get; private set; } = null!;

    private Med()
    {
    }

    private Med(string name, Dosage dosage)
    {
        Name = name;
        Dose = dosage;
    }

    public static Med Create(string name, Dosage dosage)
    {
        if (string.IsNullOrWhiteSpace(name))
            throw new ArgumentException($"Medication name cannot be null or empty", nameof(name));

        return new Med(name, dosage);
    }

    public void Update(string name, Dosage dosage)
    {
        if (string.IsNullOrWhiteSpace(name))
            throw new ArgumentException($"Medication name cannot be null or empty", nameof(name));

        this.Name = name;
        this.Dose = dosage;
    }
}

