using MoodTracker.Domain.Abstractions;

namespace MoodTracker.Domain.NoteAggregate.Events;

public class MedicationRemovedEvent : DomainEventBase
{
    public MedicationRemovedEvent(Medication medication)
    {
        Medication = medication;
    }
    public Medication Medication { get; } = null!;
}
