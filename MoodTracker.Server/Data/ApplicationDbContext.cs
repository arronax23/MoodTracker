using Microsoft.EntityFrameworkCore;
using MoodTracker.API.Abstractions;
using MoodTracker.Domain.MedicationSetAggregate;
using MoodTracker.Domain.NoteAggregate;
using MoodTracker.Server;
using System.Reflection;

namespace MoodTracker.Infrastructure.Data;

public class ApplicationDbContext : DbContext, IApplicationDbContext
{
    public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options) {}

    public DbSet<Note> Notes { get; set; }
    public DbSet<MedicationSet> MedicationSets { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);
        modelBuilder.ApplyConfigurationsFromAssembly(Assembly.GetExecutingAssembly());
    }
}
