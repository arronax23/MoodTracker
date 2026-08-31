using MoodTracker.API.DTOs;

namespace MoodTracker.API.Endpoints.Requests;

public class UpdateSetRequest
{
    public MedicationSetDto Set { get; set; } = null!;
}
