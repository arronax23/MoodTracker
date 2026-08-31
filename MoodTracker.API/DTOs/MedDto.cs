namespace MoodTracker.API.DTOs;

public class MedDto
{
    public int Id { get; set; }
    public string Name { get; set; } = null!;
    public DosageDto Dose { get; set; } = null!;
}
