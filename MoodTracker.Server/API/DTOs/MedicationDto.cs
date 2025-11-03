namespace MoodTracker.Server.API.DTOs;

public class MedicationDto
{
    public TimeOnly Time { get; set; }
    public string Name { get; set; } = null!;
    public DosageDto Dose { get; set; } = null!;
}
