namespace MoodTracker.API.DTOs;

public class MedCountForTimePeriodDto
{
    public string MedicationName { get; set; } = null!;
    public List<MedWithDoseDto> MedicationWithDose { get; set; } = null!;
    public int Count { get; set; }
}


public class MedWithDoseDto
{
    public string MedicationName { get; set; } = null!;
    public int Count { get; set; }
}