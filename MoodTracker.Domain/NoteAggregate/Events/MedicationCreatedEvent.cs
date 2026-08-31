using MoodTracker.Domain.Abstractions;

namespace MoodTracker.Domain.NoteAggregate.Events;

public class MedicationCreatedEvent : DomainEventBase
{
    public MedicationCreatedEvent(Medication medication)
    {
        Medication = medication;
    }
    public Medication Medication { get; } = null!;
}
