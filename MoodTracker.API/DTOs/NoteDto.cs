namespace MoodTracker.API.DTOs;

public class NoteDto
{
    public int Id { get; set; }
    public IEnumerable<MedicationDto>? Medications { get; set; }
    public IEnumerable<ThoughtDto>? Thoughts { get; set; }
    public DateOnly Date { get; set; }
    public MoodDto? Mood { get; set; }

}
