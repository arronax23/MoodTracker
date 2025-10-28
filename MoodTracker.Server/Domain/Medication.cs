using MoodTracker.Server.Domain.Abstractions;

namespace MoodTracker.Server.Domain;

public record Medication : IValueObject
{
    public string Name { get; private set; } = null!;
    public Dosage Dose { get; private set; } = null!;

    private Medication(string name, Dosage dosage)
    {
        Name = name;
        Dose = dosage;
    }

    public static Medication Create(string name, Dosage dosage)
    {
        if (string.IsNullOrWhiteSpace(name))
            throw new ArgumentException($"Medication name cannot be null or empty", nameof(name));

        return new Medication(name, dosage);
    }

    public class Dosage
    {
        public uint Value { get; set; }
        public string Unit { get; set; } = null!;
    }
}
