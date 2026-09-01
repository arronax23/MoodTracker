using MoodTracker.API.Abstractions;
using MoodTracker.API.EventHandlers.Utilities;
using MoodTracker.Domain.NoteAggregate.Events;

namespace MoodTracker.API.EventHandlers;

internal class MedicationUpdatedEventHandler(MedCountUtility utility) : IDomainEventHandler<MedicationUpdatedEvent>
{
    public Task Handle(MedicationUpdatedEvent @event, CancellationToken cancellationToken)
    {
        var newMedicationName = @event.NewMedication.NameWithDoseLabel;
        var currentMedicationName = @event.CurrentMedication.NameWithDoseLabel;

        var newParentName = @event.NewMedication.Name;
        var currentParentName = @event.CurrentMedication.Name;

        if (newMedicationName == currentMedicationName)
            return Task.CompletedTask;

        else if (newMedicationName != currentMedicationName && newParentName == currentParentName)
            HandleDoseChange(newMedicationName, currentMedicationName);
        else if (newMedicationName != currentMedicationName && newParentName != currentParentName)
            HandleMedicationChange(newMedicationName, currentMedicationName, newParentName, currentParentName);

        return Task.CompletedTask;
    }

    private void HandleDoseChange(string newMedicationName, string currentMedicationName)
    {
        utility.RemoveExistingMedCount(currentMedicationName);
        utility.AddMedCount(newMedicationName);
    }

    private void HandleMedicationChange(
        string newMedicationName,
        string currentMedicationName,
        string newParentName,
        string currentParentName)
    {
        utility.RemoveExistingMedCount(currentMedicationName);
        utility.RemoveExistingMedCount(currentParentName);

        utility.AddMedCount(newMedicationName);
        utility.AddMedCount(newParentName);
    }
}   