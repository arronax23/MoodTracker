namespace MoodTracker.API.Projections;

public class MedCount
{
    public int Id { get; set; }
    public string MedicationName { get; set; } = null!;
    public int Count { get; set; }
    public int? ParentId { get; set; }
    public MedCount? Parent { get; set; }
    public ICollection<MedCount> Children { get; private set; } = [];
}
