using Microsoft.EntityFrameworkCore;
using MoodTracker.Server.API.Services;
using MoodTracker.Server.Infrasctructure;

var builder = WebApplication.CreateBuilder(args);


builder.Services.AddControllers();
builder.Services.AddOpenApi();

builder.Services.AddSingleton<Settings>();
builder.Services.AddScoped<NoteService>();
builder.Services.AddScoped<WellbutrinInfoService>();


builder.Services.AddDbContext<ApplicationDbContext>(
    options => options.UseSqlite("Data Source=moodTracker.db"));

var app = builder.Build();

app.UseDefaultFiles();
app.MapStaticAssets();

if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
}

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.MapFallbackToFile("/index.html");

app.Run();
