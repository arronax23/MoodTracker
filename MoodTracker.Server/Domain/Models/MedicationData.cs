namespace MoodTracker.Server.Domain.Models;

public class MedicationData
{
    public int Id { get; set; }
    public string Name { get; set; } = null!;
    public Dosage Dosage { get; set; } = null!;
}
