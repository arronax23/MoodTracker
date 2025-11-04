using MoodTracker.Server.API.DTOs;

namespace MoodTracker.Server.API.Endpoints.Requests;

public class AddMedicationRequest
{
    public DateOnly Date { get; set; }
    public MedicationDto Medication { get; set; } = null!;
}
