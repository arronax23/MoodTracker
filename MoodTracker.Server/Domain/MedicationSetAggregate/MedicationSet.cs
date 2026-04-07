using MoodTracker.Server.Domain.Abstractions;

namespace MoodTracker.Server.Domain.MedicationSetAggregate;

public class MedicationSet : AuditableEntityBase, IAggreateRoot
{
    private List<Med> _medications = new List<Med>();
    public string Name { get; private set; }

    private MedicationSet(string name)
    {
        Name = name;
        this.CreatedAt = DateTime.Now;
        this.UpdatedAt = DateTime.Now;
    }

    public static MedicationSet Create(string name)
    {
        if (string.IsNullOrWhiteSpace(name))
            throw new ArgumentException($"Medication set name cannot be null or empty", nameof(name));

        return new MedicationSet(name);
    }


    public void AddMedications(IEnumerable<Med> medications)
    {
        foreach (var med in medications)
            this.AddMedication(med);
    }

    public void AddMedication(Med medication)
    {
        _medications.Add(medication);
        this.UpdatedAt = DateTime.Now;
    }

    public void UpdateMedication(int medId, Med updateMedication)
    {
        var medication = _medications.Single(m => m.Id == medId);

        medication.Update(updateMedication);
        this.UpdatedAt = DateTime.Now;  
    }

    public void DeleteMedication(int medId)
    {
        var medication = _medications.Single(m => m.Id == medId);
        _medications.Remove(medication);
        this.UpdatedAt = DateTime.Now;
    }


    public IReadOnlyList<Med> GetMedications() => _medications.AsReadOnly();
}
