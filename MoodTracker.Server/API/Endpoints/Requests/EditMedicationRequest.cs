using MoodTracker.Server.API.DTOs;
namespace MoodTracker.Server.API.Endpoints.Requests;

public class EditMedicationRequest
{
    public int NoteId { get; set; }
    public MedicationDto Medication { get; set; } = null!;
}
