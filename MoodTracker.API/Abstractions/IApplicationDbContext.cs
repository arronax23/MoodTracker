using Microsoft.EntityFrameworkCore;
using MoodTracker.API.Projections;
using MoodTracker.Domain.MedicationSetAggregate;
using MoodTracker.Domain.NoteAggregate;

namespace MoodTracker.API.Abstractions;

public interface IApplicationDbContext
{
    public DbSet<Note> Notes { get; set; }
    public DbSet<MedicationSet> MedicationSets { get; set; }
    public DbSet<MedCount> MedCounts { get; set; }

    Task<int> SaveChangesAsync(CancellationToken cancellationToken = default(CancellationToken));
    int SaveChanges();
}
