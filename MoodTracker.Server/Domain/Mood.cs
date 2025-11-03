using MoodTracker.Server.Domain.Abstractions;

namespace MoodTracker.Server.Domain;

public record Mood : IValueObject
{
    public MoodRate Rate { get; private set; }

    private Mood()
    {
    }

    private Mood(uint rate)
    {
        Rate = (MoodRate)rate;
    }

    public static Mood Create(uint rate)
    {
        if (rate is < 1 or > 10)
            throw new ArgumentOutOfRangeException(nameof(rate), "Mood rate must be between 1 and 10.");

        return new Mood(rate); 
    }

    public enum MoodRate
    {
        One = 1,
        Two,
        Three,
        Four,
        Five,
        Six,
        Seven,
        Eight,
        Nine,
        Ten
    }
}
