namespace MoodTracker.Server.API.DTOs;

public class DayDto
{
    public int Id { get; set; }
    public int Moodrate { get; set; }
    public IEnumerable<MedicationDto> Medications { get; set; } = null!;
}
