using MoodTracker.Server.Domain.Abstractions;

namespace MoodTracker.Server.Domain.NoteAggregate;

public class Thought : EntityBase
{
    public TimeOnly Time { get; set; }
    public string Text { get; set; } = null!;

    private Thought()
    {
    }

    private Thought(TimeOnly time, string text)
    {
        Time = time;
        Text = text;
    }

    public static Thought Create(TimeOnly time, string text)
    {
        if (string.IsNullOrWhiteSpace(text))
            throw new ArgumentException($"Thought text cannot be null or empty", nameof(text));

        return new Thought(time, text);
    }

    public void Update(Thought updateThought)
    {
        if (string.IsNullOrWhiteSpace(updateThought.Text))
            throw new ArgumentException($"Thought text cannot be null or empty", nameof(updateThought.Text));

        this.Time = updateThought.Time;
        this.Text = updateThought.Text;
    }
}
