using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace MoodTracker.Server.Migrations
{
    /// <inheritdoc />
    public partial class Add_Thoughts : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Medications_Notes_DayId",
                table: "Medications");

            migrationBuilder.RenameColumn(
                name: "DayId",
                table: "Medications",
                newName: "NoteId");

            migrationBuilder.RenameIndex(
                name: "IX_Medications_DayId",
                table: "Medications",
                newName: "IX_Medications_NoteId");

            migrationBuilder.CreateTable(
                name: "Thought",
                columns: table => new
                {
                    Id = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    Time = table.Column<TimeOnly>(type: "TEXT", nullable: false),
                    Text = table.Column<string>(type: "TEXT", nullable: false),
                    NoteId = table.Column<int>(type: "INTEGER", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Thought", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Thought_Notes_NoteId",
                        column: x => x.NoteId,
                        principalTable: "Notes",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Thought_NoteId",
                table: "Thought",
                column: "NoteId");

            migrationBuilder.AddForeignKey(
                name: "FK_Medications_Notes_NoteId",
                table: "Medications",
                column: "NoteId",
                principalTable: "Notes",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Medications_Notes_NoteId",
                table: "Medications");

            migrationBuilder.DropTable(
                name: "Thought");

            migrationBuilder.RenameColumn(
                name: "NoteId",
                table: "Medications",
                newName: "DayId");

            migrationBuilder.RenameIndex(
                name: "IX_Medications_NoteId",
                table: "Medications",
                newName: "IX_Medications_DayId");

            migrationBuilder.AddForeignKey(
                name: "FK_Medications_Notes_DayId",
                table: "Medications",
                column: "DayId",
                principalTable: "Notes",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
