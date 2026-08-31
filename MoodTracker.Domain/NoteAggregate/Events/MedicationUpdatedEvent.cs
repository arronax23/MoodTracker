using MoodTracker.Domain.Abstractions;

namespace MoodTracker.Domain.NoteAggregate.Events;

public class MedicationUpdatedEvent : DomainEventBase
{
    public MedicationUpdatedEvent(Medication medication)
    {
        Medication = medication;
    }
    public Medication Medication { get; } = null!;
}
