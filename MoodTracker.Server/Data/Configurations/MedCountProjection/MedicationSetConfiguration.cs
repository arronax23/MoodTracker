using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using MoodTracker.API.Projections;

namespace MoodTracker.Infrastructure.Data.Configurations.MedicationSetAggregate;

public class MedCountConfiguration : IEntityTypeConfiguration<MedCount>
{
    public void Configure(EntityTypeBuilder<MedCount> builder)
    {
        builder.ToTable("MedCount", "projections");
        builder.HasKey(x => x.Id);

        builder.HasIndex(x => x.Count);
        builder.HasIndex(x => x.ParentId);

        builder
            .HasOne(x => x.Parent)
            .WithMany(x => x.Children)
            .HasForeignKey(x => x.ParentId)
            .IsRequired(false)
            .OnDelete(DeleteBehavior.Restrict);

    }
}
