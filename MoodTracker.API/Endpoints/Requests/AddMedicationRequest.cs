using MoodTracker.API.DTOs;

namespace MoodTracker.API.Endpoints.Requests;

public class AddMedicationRequest
{
    public DateOnly Date { get; set; }
    public MedicationDto Medication { get; set; } = null!;
}
