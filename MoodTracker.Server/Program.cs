using Microsoft.EntityFrameworkCore;
using MoodTracker.API.Abstractions;
using MoodTracker.API.DependencyInjection;
using MoodTracker.Infrastructure.AppSettings;
using MoodTracker.Infrastructure.Data;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllers();
builder.Services.AddOpenApi();

builder.Services.AddSingleton<ISettings, Settings>();
builder.Services.AddAPIServices();

builder.Services.AddDbContext<ApplicationDbContext>(
    options => options.UseSqlite("Data Source=moodTracker.db"));

builder.Services.AddScoped<IApplicationDbContext>(provider => provider.GetRequiredService<ApplicationDbContext>());

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
