using MoodTracker.API.Abstractions;
using MoodTracker.API.Projections;
using MoodTracker.Domain.NoteAggregate.Events;

namespace MoodTracker.API.EventHandlers;

internal class MedicationCreatedEventHandler(IApplicationDbContext dbContext) : IDomainEventHandler<MedicationCreatedEvent>
{
    public async Task Handle(MedicationCreatedEvent @event, CancellationToken cancellationToken)
    {
        var medicationName = $"{@event.Medication.Name} {@event.Medication.Dose.Value}{@event.Medication.Dose.Unit}";
        
        var medCount = dbContext.MedCounts.SingleOrDefault(m => m.MedicationName == medicationName);

        if (medCount is not null)
            medCount.Count += 1;
        else
        {
            var parentMedCount = dbContext.MedCounts.SingleOrDefault(m => m.MedicationName == @event.Medication.Name);

            await dbContext.MedCounts.AddAsync(new MedCount()
            {
                MedicationName = medicationName,
                Count = 1,
                Parent = parentMedCount,
            });
        }
    }
}
