using Microsoft.EntityFrameworkCore;
using MoodTracker.API.Abstractions;
using MoodTracker.API.Projections;
using MoodTracker.Domain.MedicationSetAggregate;
using MoodTracker.Domain.NoteAggregate;
using System.Reflection;

namespace MoodTracker.Infrastructure.Data;

public class ApplicationDbContext : DbContext, IApplicationDbContext
{
    public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options) {}

    public DbSet<Note> Notes { get; set; }
    public DbSet<MedicationSet> MedicationSets { get; set; }
    public DbSet<MedCount> MedCounts { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);
        modelBuilder.ApplyConfigurationsFromAssembly(Assembly.GetExecutingAssembly());
    }
}
