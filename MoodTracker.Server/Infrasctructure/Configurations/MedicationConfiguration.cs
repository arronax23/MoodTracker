using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using MoodTracker.Server.Domain;

namespace MoodTracker.Server.Infrastructure.Configurations;

public class MedicationConfiguration : IEntityTypeConfiguration<Medication>
{
    public void Configure(EntityTypeBuilder<Medication> builder)
    {
        builder.ToTable("Medications");

        builder.Property<int>("Id");
        builder.HasKey("Id");

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
