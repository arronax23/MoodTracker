using MoodTracker.API.Abstractions;
using MoodTracker.API.Projections;

namespace MoodTracker.API.EventHandlers.Utilities;

internal class MedCountUtility(IApplicationDbContext dbContext)
{
    public void RemoveExistingMedCount(string medicationName)
    {
        var medCount = dbContext.MedCounts.Single(mc => mc.MedicationName == medicationName);

        if (medCount.Count == 1)
            dbContext.MedCounts.Remove(medCount);
        else
            medCount.Count--;
    }

    public void AddMedCount(string medicationName)
    {
        var medCount = dbContext.MedCounts.SingleOrDefault(mc => mc.MedicationName == medicationName);

        if (medCount is not null)
            medCount.Count++;
        else
        {
            dbContext.MedCounts.Add(new MedCount
            {
                MedicationName = medicationName,
                Count = 1
            });
        }
    }
}
