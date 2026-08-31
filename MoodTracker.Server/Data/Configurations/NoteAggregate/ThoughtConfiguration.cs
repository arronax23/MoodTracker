using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using MoodTracker.Domain.NoteAggregate;

namespace MoodTracker.Infrastructure.Data.Configurations.NoteAggregate;

public class ThoughtConfiguration : IEntityTypeConfiguration<Thought>
{
    public void Configure(EntityTypeBuilder<Thought> builder) => builder.ToTable("Thoughts");
}
