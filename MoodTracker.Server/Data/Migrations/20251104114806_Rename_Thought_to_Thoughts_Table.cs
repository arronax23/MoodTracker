using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace MoodTracker.Server.Migrations
{
    /// <inheritdoc />
    public partial class Rename_Thought_to_Thoughts_Table : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Thought_Notes_NoteId",
                table: "Thought");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Thought",
                table: "Thought");

            migrationBuilder.RenameTable(
                name: "Thought",
                newName: "Thoughts");

            migrationBuilder.RenameIndex(
                name: "IX_Thought_NoteId",
                table: "Thoughts",
                newName: "IX_Thoughts_NoteId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Thoughts",
                table: "Thoughts",
                column: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Thoughts_Notes_NoteId",
                table: "Thoughts",
                column: "NoteId",
                principalTable: "Notes",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Thoughts_Notes_NoteId",
                table: "Thoughts");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Thoughts",
                table: "Thoughts");

            migrationBuilder.RenameTable(
                name: "Thoughts",
                newName: "Thought");

            migrationBuilder.RenameIndex(
                name: "IX_Thoughts_NoteId",
                table: "Thought",
                newName: "IX_Thought_NoteId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Thought",
                table: "Thought",
                column: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Thought_Notes_NoteId",
                table: "Thought",
                column: "NoteId",
                principalTable: "Notes",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
