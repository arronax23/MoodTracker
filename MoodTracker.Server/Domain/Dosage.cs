namespace MoodTracker.Server.Domain;

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