using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Diagnostics;
using MoodTracker.API.Abstractions;
using MoodTracker.API.DependencyInjection;
using MoodTracker.Infrastructure.AppSettings;
using MoodTracker.Infrastructure.Data;
using MoodTracker.Infrastructure.Data.Interceptors;
using System.Reflection;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllers();
builder.Services.AddOpenApi();

builder.Services.AddSingleton<ISettings, Settings>();
builder.Services.AddAPIServices();

builder.Services.AddScoped<ISaveChangesInterceptor, DispatchDomainEventsInterceptor>(); //to do
//builder.Services.AddScoped<ISaveChangesInterceptor, MedicationInterceptor>();

builder.Services.AddDbContext<ApplicationDbContext>((sp, options) =>
{
    options.AddInterceptors(sp.GetServices<ISaveChangesInterceptor>());
    options.UseSqlite("Data Source=moodTracker.db");
});

builder.Services.AddScoped<IApplicationDbContext>(provider => provider.GetRequiredService<ApplicationDbContext>());

builder.Services.AddMediatR(cfg => {
    cfg.RegisterServicesFromAssembly(Assembly.GetExecutingAssembly());
    cfg.RegisterServicesFromAssemblyContaining(typeof(MoodTracker.API.IAssemblyMarker));
});

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
