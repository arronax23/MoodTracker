using MoodTracker.Server.Domain;
using MoodTracker.Server.Domain.Abstractions;
using MoodTracker.Server.Domain.MedicationSetAggregate;
using MoodTracker.Server.Domain.Models;

namespace MoodTracker.UnitTests.Domain;

public class MedicationSetTests
{

    [Fact]
    public void Update_ShouldUpdateNameExistingMedications_AddNewMedications_AndRemoveDeletedMedications()
    {
        // Arrange
        var set = MedicationSet.Create("Morning");

        set.AddMedication(MedTestExtensions.CreateWithId("Med A", Dosage.Create(10, "mg"), 1));
        set.AddMedication(MedTestExtensions.CreateWithId("Med B", Dosage.Create(20, "mg"), 2));



        var updateMeds = new List<MedicationData>
        {
            new()
            {
                Id = 1,
                Name = "Med A Updated",
                Dosage = Dosage.Create(15, "mg")
            },
            new()
            {
                Id = 0,
                Name = "Med C",
                Dosage = Dosage.Create(30, "mg")
            }
        };

        // Act
        set.Update("Evening", updateMeds);

        // Assert
        Assert.Equal("Evening", set.Name);

        var medications = set.GetMedications();

        Assert.Equal(2, medications.Count);

        // istniejący lek został zaktualizowany
        var updatedMed = medications.Single(m => m.Id == 1);

        Assert.Equal("Med A Updated", updatedMed.Name);
        Assert.Equal(15, updatedMed.Dose.Value);
        Assert.Equal("mg", updatedMed.Dose.Unit);

        // stary Med B został usunięty,
        // a Med C został dodany
        Assert.DoesNotContain(medications, m => m.Name == "Med B");
        Assert.Contains(medications, m => m.Name == "Med C");
    }
}

public static class MedTestExtensions
{
    public static Med CreateWithId(
        string name,
        Dosage dosage,
        int id)
    {
        var med = Med.Create(name, dosage);

        typeof(EntityBase)
            .GetProperty(nameof(EntityBase.Id))!
            .SetValue(med, id);

        return med;
    }
}