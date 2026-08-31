namespace MoodTracker.Domain.Abstractions;

public class AuditableEntityBase : EntityBase
{
    public DateTime CreatedAt { get; protected set; }
    public DateTime UpdatedAt { get; protected set; }
}
