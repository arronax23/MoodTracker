using MoodTracker.Server.API.DTOs;

namespace MoodTracker.Server.API.Endpoints.Requests;

public class UpdateSetRequest
{
    public MedicationSetDto Set { get; set; } = null!;
}
