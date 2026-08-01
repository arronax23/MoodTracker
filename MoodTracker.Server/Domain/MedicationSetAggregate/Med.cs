using MoodTracker.Server.Domain.Abstractions;

namespace MoodTracker.Server.Domain.MedicationSetAggregate;

public class Med : EntityBase
{
    public string Name { get; private set; } = null!;
    public Dosage Dose { get; private set; } = null!;

    private Med()
    {
    }

    private Med(string name, Dosage dosage)
    {
        Name = name;
        Dose = dosage;
    }

    private Med(int id, string name, Dosage dosage)
    {
        Id = id;
        Name = name;
        Dose = dosage;
    }

    public static Med Create(string name, Dosage dosage)
    {
        if (string.IsNullOrWhiteSpace(name))
            throw new ArgumentException($"Medication name cannot be null or empty", nameof(name));

        return new Med(name, dosage);
    }

    public static Med CreateWithId(int id,string name, Dosage dosage)
    {
        if (string.IsNullOrWhiteSpace(name))
            throw new ArgumentException($"Medication name cannot be null or empty", nameof(name));

        return new Med(id, name, dosage);
    }


    public void Update(Med updateMedication)
    {
        if (string.IsNullOrWhiteSpace(updateMedication.Name))
            throw new ArgumentException($"Medication name cannot be null or empty", nameof(updateMedication.Name));

        this.Name = updateMedication.Name;
        this.Dose = updateMedication.Dose;
    }
}
