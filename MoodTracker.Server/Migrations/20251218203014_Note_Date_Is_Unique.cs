using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace MoodTracker.Server.Migrations
{
    /// <inheritdoc />
    public partial class Note_Date_Is_Unique : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateIndex(
                name: "IX_Notes_Date",
                table: "Notes",
                column: "Date",
                unique: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "IX_Notes_Date",
                table: "Notes");
        }
    }
}
