using MoodTracker.API.Abstractions;
using MoodTracker.Domain.NoteAggregate.Events;

namespace MoodTracker.API.EventHandlers;

internal class MedicationUpdatedEventHandler(IApplicationDbContext dbContext) : IDomainEventHandler<MedicationUpdatedEvent>
{
    public Task Handle(MedicationUpdatedEvent @event, CancellationToken cancellationToken)
    {
        throw new NotImplementedException();
    }
}
