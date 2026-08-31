namespace MoodTracker.API.DTOs;

public class MedicationDto
{
    public int Id { get; set; }
    public string Time { get; set; } = null!;
    public string Name { get; set; } = null!;
    public DosageDto Dose { get; set; } = null!;
}
