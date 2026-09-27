using MoodTracker.Domain.Abstractions;
using MoodTracker.Domain.Models;
using MoodTracker.Domain.NoteAggregate.Events;
using System.ComponentModel.DataAnnotations.Schema;
using System.Globalization;

namespace MoodTracker.Domain.NoteAggregate;

public class Medication : EntityBase
{
    public TimeOnly Time { get; private set; }
    public string Name { get; private set; } = null!;
    public Dosage Dose { get; private set; } = null!;

    public string NameWithDoseLabel => $"{Name} {Dose.ToString()}";

    private Medication()
    {
    }

    private Medication(TimeOnly time, string name, Dosage dosage)
    {
        Time = time;
        Name = name;
        Dose = dosage;

        AddDomainEvent(new MedicationCreatedEvent(this));
    }

    public static Medication Create(TimeOnly time, string name, Dosage dosage)
    {
        if (string.IsNullOrWhiteSpace(name))
            throw new ArgumentException($"Medication name cannot be null or empty", nameof(name));

        return new Medication(time, name, dosage);
    }

    public void Update(MedicationAtData updateMedication)
    {
        if (string.IsNullOrWhiteSpace(updateMedication.Name))
            throw new ArgumentException($"Medication name cannot be null or empty", nameof(updateMedication.Name));
     
        AddDomainEvent(new MedicationUpdatedEvent(
            currentMedication: Medication.Create(this.Time, this.Name, Dosage.Create(this.Dose.Value, this.Dose.Unit)),
            newMedication: this)
        );

        this.Time = updateMedication.Time;
        this.Name = updateMedication.Name;  
        this.Dose = updateMedication.Dosage;

    }
}
