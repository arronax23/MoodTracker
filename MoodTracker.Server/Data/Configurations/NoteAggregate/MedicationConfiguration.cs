using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using MoodTracker.Domain.NoteAggregate;

namespace MoodTracker.Infrastructure.Data.Configurations.NoteAggregate;

public class MedicationConfiguration : IEntityTypeConfiguration<Medication>
{
    public void Configure(EntityTypeBuilder<Medication> builder)
    {
        builder.ToTable("Medications");

        builder.OwnsOne(x => x.Dose, dose =>
        {
            dose.Property(y => y.Value)
           .HasColumnName("DoseValue")
           .IsRequired();

            dose.Property(y => y.Unit)
            .HasColumnName("DoseUnit")
            .IsRequired();

        });
    }
}
