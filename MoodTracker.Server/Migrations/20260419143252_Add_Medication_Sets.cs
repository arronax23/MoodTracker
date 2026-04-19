using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace MoodTracker.Server.Migrations
{
    /// <inheritdoc />
    public partial class Add_Medication_Sets : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.EnsureSchema(
                name: "sets");

            migrationBuilder.CreateTable(
                name: "MedicationSets",
                schema: "sets",
                columns: table => new
                {
                    Id = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    Name = table.Column<string>(type: "TEXT", nullable: false),
                    CreatedAt = table.Column<DateTime>(type: "TEXT", nullable: false),
                    UpdatedAt = table.Column<DateTime>(type: "TEXT", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_MedicationSets", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Meds",
                schema: "sets",
                columns: table => new
                {
                    Id = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    Name = table.Column<string>(type: "TEXT", nullable: false),
                    DoseValue = table.Column<decimal>(type: "TEXT", nullable: false),
                    DoseUnit = table.Column<string>(type: "TEXT", nullable: false),
                    MedicationSetId = table.Column<int>(type: "INTEGER", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Meds", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Meds_MedicationSets_MedicationSetId",
                        column: x => x.MedicationSetId,
                        principalSchema: "sets",
                        principalTable: "MedicationSets",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Meds_MedicationSetId",
                schema: "sets",
                table: "Meds",
                column: "MedicationSetId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Meds",
                schema: "sets");

            migrationBuilder.DropTable(
                name: "MedicationSets",
                schema: "sets");
        }
    }
}
