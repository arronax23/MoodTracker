using MoodTracker.API.Abstractions;
using MoodTracker.API.EventHandlers.Utilities;
using MoodTracker.Domain.NoteAggregate.Events;

namespace MoodTracker.API.EventHandlers;

internal class MedicationRemovedEventHandler(MedCountUtility utility) : IDomainEventHandler<MedicationRemovedEvent>
{
    public async Task Handle(MedicationRemovedEvent @event, CancellationToken cancellationToken)
    {
        var medicationName = @event.Medication.NameWithDoseLabel;
        var parentMedicationName = @event.Medication.Name;

        utility.RemoveExistingMedCount(medicationName);
        utility.RemoveExistingMedCount(parentMedicationName);
    }
}
