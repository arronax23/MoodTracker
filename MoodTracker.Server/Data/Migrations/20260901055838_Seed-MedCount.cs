using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace MoodTracker.Server.Migrations
{
    /// <inheritdoc />
    public partial class SeedMedCount : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.Sql(@"
                INSERT INTO MedCount (MedicationName, Count)
                select  Name as MedicationName,  count(*) as Count from Medications
                group by Name;");

            migrationBuilder.Sql(@"
                WITH Meds AS (
                  select 
                    Name || ' ' || DoseValue || DoseUnit as MedicationName,
                    Name as NameWithoutDose,
                    count(*) as Count from Medications
                  group by Name || ' ' || DoseValue || DoseUnit
                )
                INSERT INTO MedCount (MedicationName, Count, ParentId)
                SELECT m.MedicationName, m.Count, mc.Id as ParentId FROM Meds m
                JOIN MedCount mc ON m.NameWithoutDose = mc.MedicationName");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.Sql(@"delete from MedCount;");
        }
    }
}
