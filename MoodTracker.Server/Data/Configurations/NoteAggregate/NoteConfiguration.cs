using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using MoodTracker.Domain.NoteAggregate;

namespace MoodTracker.Infrastructure.Data.Configurations.NoteAggregate;

public class NoteConfiguration : IEntityTypeConfiguration<Note>
{
    public void Configure(EntityTypeBuilder<Note> builder)
    {
        builder.ToTable("Notes");

        builder.HasKey(n => n.Id);

        builder
            .HasIndex(n => n.Date)
            .IsUnique();

        builder.OwnsOne(n => n.Mood, mood =>
        {
            mood.Property(m => m.Rate)
                .HasColumnName("MoodRate")
                .HasConversion<int>()
                .IsRequired();

            mood.Property(m => m.Color)
                .HasColumnName("MoodColor")
                .HasConversion<int>()
                .IsRequired();
        });

        builder.HasMany<Medication>(n => n.Medications)
               .WithOne()
               .HasForeignKey("NoteId")
               .OnDelete(DeleteBehavior.Cascade)
               .IsRequired();

        builder.HasMany<Thought>(n => n.Thoughts)
               .WithOne()
               .HasForeignKey("NoteId")
               .OnDelete(DeleteBehavior.Cascade)
               .IsRequired();
    }
}
