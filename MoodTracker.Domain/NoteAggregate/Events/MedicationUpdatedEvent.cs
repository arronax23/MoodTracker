using MoodTracker.Domain.Abstractions;

namespace MoodTracker.Domain.NoteAggregate.Events;

public class MedicationUpdatedEvent : DomainEventBase
{
    public MedicationUpdatedEvent(Medication currentMedication, Medication newMedication)
    {
        CurrentMedication = currentMedication;
        NewMedication = newMedication;
    }

    public Medication CurrentMedication { get; } = null!;
    public Medication NewMedication { get; } = null!;
}
