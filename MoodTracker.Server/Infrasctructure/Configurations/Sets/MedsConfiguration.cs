using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using MoodTracker.Server.Domain.MedicationSetAggregate;
namespace MoodTracker.Server.Infrasctructure.Configurations.Sets;

public class MedsConfiguration : IEntityTypeConfiguration<Med>
{
    public void Configure(EntityTypeBuilder<Med> builder)
    {
        builder.ToTable("Meds", "sets");

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
