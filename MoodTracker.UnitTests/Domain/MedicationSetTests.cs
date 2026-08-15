//using MoodTracker.Server.Domain.MedicationSetAggregate;

//namespace MoodTracker.UnitTests.Domain;

//public class MedicationSetTests
//{

//    [Fact]
//    public void Update_ShouldUpdateNameExistingMedications_AddNewMedications_AndRemoveDeletedMedications()
//    {
//        // Arrange
//        var set = MedicationSet.Create("Morning");

//        set.AddMedication(new MedicationSet.MedicationData
//        {
//            Id = 1,
//            Name = "Med A",
//            Dosage = Dosage.Create(10, "mg")
//        });

//        set.AddMedication(new MedicationSet.MedicationData
//        {
//            Id = 2,
//            Name = "Med B",
//            Dosage = Dosage.Create(20, "mg")
//        });

//        var updateMeds = new List<MedicationData>
//        {
//            new()
//            {
//                Id = 1,
//                Name = "Med A Updated",
//                Dosage = Dosage.Create(15, "mg")
//            },
//            new()
//            {
//                Id = 0,
//                Name = "Med C",
//                Dosage = Dosage.Create(30, "mg")
//            }
//        };

//        // Act
//        set.Update("Evening", updateMeds);

//        // Assert
//        Assert.Equal("Evening", set.Name);

//        var medications = set.GetMedications();

//        Assert.Equal(2, medications.Count);

//        // istniejący lek został zaktualizowany
//        var updatedMed = medications.Single(m => m.Id == 1);

//        Assert.Equal("Med A Updated", updatedMed.Name);
//        Assert.Equal(15, updatedMed.Dose.Value);
//        Assert.Equal("mg", updatedMed.Dose.Unit);

//        // stary Med B został usunięty,
//        // a Med C został dodany
//        Assert.DoesNotContain(medications, m => m.Name == "Med B");
//        Assert.Contains(medications, m => m.Name == "Med C");
//    }
//}
//}

