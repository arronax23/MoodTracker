namespace MoodTracker.Server.API.DTOs;

public class MedicationSetDto
{
    public int Id { get; set; } 
    public string Name { get; set; } = null!;
    public IEnumerable<MedDto> Meds { get; set; } = null!;
}
