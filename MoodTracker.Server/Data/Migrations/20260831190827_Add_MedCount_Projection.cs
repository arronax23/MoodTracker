using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace MoodTracker.Server.Migrations
{
    /// <inheritdoc />
    public partial class Add_MedCount_Projection : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.EnsureSchema(
                name: "projections");

            migrationBuilder.CreateTable(
                name: "MedCount",
                schema: "projections",
                columns: table => new
                {
                    Id = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    MedicationName = table.Column<string>(type: "TEXT", nullable: false),
                    Count = table.Column<int>(type: "INTEGER", nullable: false),
                    ParentId = table.Column<int>(type: "INTEGER", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_MedCount", x => x.Id);
                    table.ForeignKey(
                        name: "FK_MedCount_MedCount_ParentId",
                        column: x => x.ParentId,
                        principalSchema: "projections",
                        principalTable: "MedCount",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateIndex(
                name: "IX_MedCount_Count",
                schema: "projections",
                table: "MedCount",
                column: "Count");

            migrationBuilder.CreateIndex(
                name: "IX_MedCount_ParentId",
                schema: "projections",
                table: "MedCount",
                column: "ParentId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "MedCount",
                schema: "projections");
        }
    }
}
