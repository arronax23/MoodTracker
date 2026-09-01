using MoodTracker.Domain.Abstractions;
using System.Globalization;

namespace MoodTracker.Domain;

public record Dosage : IValueObject
{
    public decimal Value { get; set; }
    public string Unit { get; set; } = null!;

    private Dosage()
    {
    }

    public Dosage(decimal value, string unit)
    {
        Value = value;
        Unit = unit;
    }

    public static Dosage Create(decimal value, string unit)
    {
        if (string.IsNullOrWhiteSpace(unit))
            throw new ArgumentException($"Dose Unit cannot be null or empty", nameof(unit));

        if (value == 0)
            throw new ArgumentException($"Dose Value cannot 0", nameof(value));

        return new Dosage(value, unit);
    }

    public override string ToString()
    {
        if (Value == decimal.Truncate(Value))
            return $"{(int)Value}{Unit}";

        return $"{Value.ToString(CultureInfo.InvariantCulture)}{Unit}";
    }
}