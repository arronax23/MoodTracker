using MediatR;
using MoodTracker.Domain.Abstractions;

namespace MoodTracker.API.Abstractions;

internal interface IDomainEventHandler<T> : INotificationHandler<T> where T : DomainEventBase
{
}
