using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace MoodTracker.Server.Migrations
{
    /// <inheritdoc />
    public partial class Dose_Value_as_Decimal : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<decimal>(
                name: "DoseValue",
                table: "Medications",
                type: "TEXT",
                nullable: false,
                oldClrType: typeof(uint),
                oldType: "INTEGER");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<uint>(
                name: "DoseValue",
                table: "Medications",
                type: "INTEGER",
                nullable: false,
                oldClrType: typeof(decimal),
                oldType: "TEXT");
        }
    }
}
