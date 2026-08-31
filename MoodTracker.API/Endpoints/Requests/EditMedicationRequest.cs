using MoodTracker.API.DTOs;
namespace MoodTracker.API.Endpoints.Requests;

public class EditMedicationRequest
{
    public int NoteId { get; set; }
    public MedicationDto Medication { get; set; } = null!;
}
