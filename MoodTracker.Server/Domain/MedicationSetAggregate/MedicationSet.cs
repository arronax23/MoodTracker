using MoodTracker.Server.Domain.Abstractions;

namespace MoodTracker.Server.Domain.MedicationSetAggregate;

public class MedicationSet : AuditableEntityBase, IAggreateRoot
{
    private List<Med> _medications = new List<Med>();

    private MedicationSet()
    {
        this.CreatedAt = DateTime.Now;
        this.UpdatedAt = DateTime.Now;
    }

    public MedicationSet Create() => new MedicationSet();

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
}
