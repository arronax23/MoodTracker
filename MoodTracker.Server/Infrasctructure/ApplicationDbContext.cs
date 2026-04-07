using Microsoft.EntityFrameworkCore;
using MoodTracker.Server.Domain.MedicationSetAggregate;
using MoodTracker.Server.Domain.NoteAggregate;

namespace MoodTracker.Server.Infrasctructure;

public class ApplicationDbContext : DbContext
{
    public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options) {}

    public DbSet<Note> Notes { get; set; }
    public DbSet<MedicationSet> MedicationSets { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);
        modelBuilder.ApplyConfigurationsFromAssembly(typeof(IAssemblyMarker).Assembly);
    }

}
