using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using MoodTracker.Server.Domain;

namespace MoodTracker.Server.Infrastructure.Configurations;

public class NoteConfiguration : IEntityTypeConfiguration<Note>
{
    public void Configure(EntityTypeBuilder<Note> builder)
    {
        builder.ToTable("Notes");

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
               .HasForeignKey("NoteId")
               .OnDelete(DeleteBehavior.Cascade)
               .IsRequired();

        builder.HasMany<Thought>("_thoughts")
               .WithOne()
               .HasForeignKey("NoteId")
               .OnDelete(DeleteBehavior.Cascade)
               .IsRequired();
    }
}
