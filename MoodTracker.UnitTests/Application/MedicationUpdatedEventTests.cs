using MoodTracker.API.EventHandlers;
using MoodTracker.Domain;
using MoodTracker.Domain.NoteAggregate;
using MoodTracker.Infrastructure.Data;

namespace MoodTracker.UnitTests.Application;

public class MedicationUpdatedEventTests
{
    [Theory]
    [InlineData("Anafranil", 75, "mg", "Anafranil", 100, "mg")]
    [InlineData("Ranofren", 5, "mg", "Parogen", 20, "mg")]
    public void Update_Test(
        string currentName,
        decimal currentDoseValue,
        string currentDoseUnit,
        string newName,
        decimal newDoseValue,
        string newDoseUnit)
    {
        // arrange
        var currentMedication = Medication.Create(TimeOnly.MinValue, currentName, Dosage.Create(currentDoseValue, currentDoseUnit));
        var newMedication = Medication.Create(TimeOnly.MinValue, newName, Dosage.Create(newDoseValue, newDoseUnit));

        //act
        //var handler = new MedicationUpdatedEventHandler(dbContext: ApplicationDbContext());

        //assert

    }
}
