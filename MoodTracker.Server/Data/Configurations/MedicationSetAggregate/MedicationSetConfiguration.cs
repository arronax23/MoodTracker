using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using MoodTracker.Domain.MedicationSetAggregate;

namespace MoodTracker.Infrastructure.Data.Configurations.MedicationSetAggregate;

public class MedicationSetConfiguration : IEntityTypeConfiguration<MedicationSet>
{
    public void Configure(EntityTypeBuilder<MedicationSet> builder)
    {
        builder.ToTable("MedicationSets", "sets");

        builder.HasKey(ms => ms.Id);

        builder.HasMany<Med>(ms => ms.Medications)
               .WithOne()
               .HasForeignKey("MedicationSetId")
               .OnDelete(DeleteBehavior.Cascade)
               .IsRequired();
    }
}
