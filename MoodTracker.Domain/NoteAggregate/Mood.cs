using MoodTracker.Domain.Abstractions;

namespace MoodTracker.Domain.NoteAggregate;

public record Mood : IValueObject
{
    public MoodRate Rate { get; private set; }
    public MoodColor Color { get; private set; }

    private Mood()
    {
    }

    private Mood(uint rate)
    {
        Rate = (MoodRate)rate;

        switch (rate)
        {
            case 1:
            case 2:
            case 3:
                Color = MoodColor.Red;
                break;
            case 4:
            case 5:
            case 6:
                Color = MoodColor.Yellow;
                break;
            case 7:
            case 8:
            case 9:
            case 10:
                Color = MoodColor.Green;
                break;
            default:
                break;
        }
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

    public enum MoodColor
    {
        Red,
        Yellow,
        Green
    }
}
