namespace MoodTracker.Server.API.DTOs;

public class DosageDto
{
    public decimal Value { get; set; }
    public string Unit { get; set; } = null!;
}
