using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using MoodTracker.Server.Domain.MedicationSetAggregate;

namespace MoodTracker.Server.Infrasctructure.Configurations.Sets;

public class MedicationSetConfiguration : IEntityTypeConfiguration<MedicationSet>
{
    public void Configure(EntityTypeBuilder<MedicationSet> builder)
    {
        builder.ToTable("MedicationSets", "sets");

        builder.HasKey(n => n.Id);

        builder.HasMany<Med>("_medications")
               .WithOne()
               .HasForeignKey("MedicationSetId")
               .OnDelete(DeleteBehavior.Cascade)
               .IsRequired();
    }
}
