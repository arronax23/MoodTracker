using MoodTracker.Domain.Abstractions;
using MoodTracker.Domain.Models;

namespace MoodTracker.Domain.MedicationSetAggregate;

public class MedicationSet : AuditableEntityBase, IAggreateRoot
{
    private List<Med> _medications = new List<Med>();

    public IReadOnlyList<Med> Medications => _medications;
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

    public void Update(string name, IEnumerable<MedicationData> updateMeds)
    {
        if (string.IsNullOrWhiteSpace(name))
            throw new ArgumentException($"Medication set name cannot be null or empty", nameof(name));

        var updateMedsCopy = updateMeds.ToList();

        if (updateMedsCopy.Any())
        {
            var medicationsIdsToRemove = new List<int>();

            foreach (var med in _medications)
            {
                var updateMed = updateMedsCopy.FirstOrDefault(m => m.Id == med.Id);

                if (updateMed is not null)
                {
                    med.Update(updateMed.Name, updateMed.Dosage);
                    updateMedsCopy.Remove(updateMed);
                }   
                else
                    medicationsIdsToRemove.Add(med.Id);
            }

            AddMedications(updateMedsCopy.Select(m => Med.Create(m.Name, m.Dosage)));
            _medications.RemoveAll(m => medicationsIdsToRemove.Contains(m.Id));
        }

        this.Name = name;
        this.UpdatedAt = DateTime.Now;
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

    public void DeleteMedication(int medId)
    {
        var medication = _medications.Single(m => m.Id == medId);
        _medications.Remove(medication);
        this.UpdatedAt = DateTime.Now;
    }


    public IReadOnlyList<Med> GetMedications() => _medications.AsReadOnly();
}
