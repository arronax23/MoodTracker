using System.ComponentModel.DataAnnotations.Schema;

namespace MoodTracker.Domain.Abstractions;

public abstract class EntityBase
{
    public int Id { get; protected set; }

    private readonly List<DomainEventBase> _domainEvents = new();

    [NotMapped]
    public IReadOnlyCollection<DomainEventBase> DomainEvents => _domainEvents.AsReadOnly();

    public void AddDomainEvent(DomainEventBase domainEvent)
    {
        _domainEvents.Add(domainEvent);
    }

    public void RemoveDomainEvent(DomainEventBase domainEvent)
    {
        _domainEvents.Remove(domainEvent);
    }

    public void ClearDomainEvents()
    {
        _domainEvents.Clear();
    }
}
