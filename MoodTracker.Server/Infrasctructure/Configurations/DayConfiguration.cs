using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using MoodTracker.Server.Domain;

namespace MoodTracker.Server.Infrastructure.Configurations;

public class DayConfiguration : IEntityTypeConfiguration<Day>
{
    public void Configure(EntityTypeBuilder<Day> builder)
    {
        builder.ToTable("Days");

        builder.HasKey(d => d.Id);

        builder.OwnsOne(d => d.Mood, mood =>
        {
            mood.Property(m => m.Rate)
                .HasColumnName("MoodRate")
                .HasConversion<int>()
                .IsRequired();
        });

        builder.HasMany<Medication>("_medications")
               .WithOne()
               .HasForeignKey("DayId")
               .OnDelete(DeleteBehavior.Cascade);
    }
}
