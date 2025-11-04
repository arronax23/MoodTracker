using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using MoodTracker.Server.Domain;

namespace MoodTracker.Server.Infrastructure.Configurations;

public class ThoughtConfiguration : IEntityTypeConfiguration<Thought>
{
    public void Configure(EntityTypeBuilder<Thought> builder) => builder.ToTable("Thoughts");
}
