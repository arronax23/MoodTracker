using MoodTracker.Server.Domain.Abstractions;

namespace MoodTracker.Server.Domain;

public record Medication : IValueObject
{
    public string Name { get; private set; } = null!;
    public Dosage Dose { get; private set; } = null!;

    private Medication()
    {
    }

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

        private Dosage()
        {
        }

        public Dosage(uint value, string unit)
        {
            Value = value;
            Unit = unit;
        }

        public static Dosage Create(uint value, string unit)
        {
            if (string.IsNullOrWhiteSpace(unit))
                throw new ArgumentException($"Dose Unit cannot be null or empty", nameof(unit));

            if (value == 0)
                throw new ArgumentException($"Dose Value cannot 0", nameof(value));

            return new Dosage(value, unit);
        }
    }
}
