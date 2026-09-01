using MoodTracker.API.Abstractions;
using MoodTracker.API.Projections;
using MoodTracker.Domain.NoteAggregate.Events;

namespace MoodTracker.API.EventHandlers;

internal class MedicationCreatedEventHandler(IApplicationDbContext dbContext) : IDomainEventHandler<MedicationCreatedEvent>
{
    public async Task Handle(MedicationCreatedEvent @event, CancellationToken cancellationToken)
    {
        var parent = await UpsertParentMedCount(@event.Medication.Name);
        await UpsertChildMedCount(@event, parent);
    }

    private async Task<MedCount> UpsertParentMedCount(string name)
    {
        var parent = dbContext.MedCounts.SingleOrDefault(m => m.MedicationName == name);

        if (parent is not null)
            parent.Count++;
        else
        {
            parent = new MedCount() { MedicationName = name, Count = 1 };
            await dbContext.MedCounts.AddAsync(parent);
        }

        return parent;
    }

    private async Task UpsertChildMedCount(MedicationCreatedEvent @event, MedCount parent)
    {
        var medicationName = @event.Medication.NameWithDoseLabel;

        var medCount = dbContext.MedCounts.SingleOrDefault(m => m.MedicationName == medicationName);

        if (medCount is not null)
            medCount.Count++;
        else
        {
            await dbContext.MedCounts.AddAsync(new MedCount()
            {
                MedicationName = medicationName,
                Count = 1,
                Parent = parent,
            });
        }
    }
}
