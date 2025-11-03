using MoodTracker.Server.Domain.Abstractions;

namespace MoodTracker.Server.Domain;

public class Medication : EntityBase
{
    public TimeOnly Time { get; private set; }
    public string Name { get; private set; } = null!;
    public Dosage Dose { get; private set; } = null!;

    private Medication()
    {
    }

    private Medication(TimeOnly time, string name, Dosage dosage)
    {
        Time = time;
        Name = name;
        Dose = dosage;
    }

    public static Medication Create(TimeOnly time, string name, Dosage dosage)
    {
        if (string.IsNullOrWhiteSpace(name))
            throw new ArgumentException($"Medication name cannot be null or empty", nameof(name));

        return new Medication(time, name, dosage);
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
