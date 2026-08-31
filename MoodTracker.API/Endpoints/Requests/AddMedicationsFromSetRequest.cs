namespace MoodTracker.API.Endpoints.Requests;

public class AddMedicationsFromSetRequest
{
    public DateOnly NoteDate { get; set; }
    public int MedicationSetId { get; set; }
    public string Time { get; set; } = string.Empty;    
}
