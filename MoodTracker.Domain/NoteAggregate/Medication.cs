using MoodTracker.Domain.Abstractions;
using MoodTracker.Domain.Models;

namespace MoodTracker.Domain.NoteAggregate;

public class Medication : EntityBase
{
    public TimeOnly Time { get; private set; }
    public string Name { get; private set; } = null!;
    public Dosage Dose { get; private set; } = null!;

    private Medication()
    {
    }

    private Medication(TimeOnly time, string name, Dosage dosage)
    {
        Time = time;
        Name = name;
        Dose = dosage;
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

        this.Time = updateMedication.Time;
        this.Name = updateMedication.Name;  
        this.Dose = updateMedication.Dosage;
    }

    public override string ToString()
    {
        return $"{Name} {Dose.ToString()}";
    }
}
