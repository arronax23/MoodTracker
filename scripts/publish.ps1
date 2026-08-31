Import-Module WebAdministration

$ErrorActionPreference = "Stop"

# ==========================
# Configuration
# ==========================

$basePath = "C:\Users\wikto\Desktop\MoodTrackerHosting"
$projectPath = Join-Path $PSScriptRoot "..\MoodTracker.Server\MoodTracker.Server.csproj"

$iisSite = "Default Web Site"
$appPool = "DefaultAppPool"

$today = Get-Date -Format "yyyy_MM_dd"
$publishPath = Join-Path $basePath $today

# ==========================
# Publish
# ==========================

Write-Host "Publishing MoodTracker..."
Write-Host "Target: $publishPath"

New-Item -ItemType Directory -Path $publishPath -Force | Out-Null

dotnet publish `
    $projectPath `
    --configuration Release `
    --output $publishPath

if ($LASTEXITCODE -ne 0) {
    Write-Error "dotnet publish failed."
    exit $LASTEXITCODE
}


# ==========================
# Grant permission for DefaultAppPool
# ==========================

Write-Host "Granting IIS permissions..."

$iisUser = "IIS AppPool\DefaultAppPool"

icacls $publishPath /grant "${iisUser}:(OI)(CI)F" /T

if ($LASTEXITCODE -ne 0) {
    Write-Error "Failed to grant IIS permissions."
    exit $LASTEXITCODE
}

# ==========================
# Stop IIS Application Pool
# ==========================

Write-Host "Stopping IIS Application Pool: $appPool"

Stop-WebAppPool -Name $appPool

# ==========================
# Change IIS physical path
# ==========================

Write-Host "Changing IIS physical path..."

Set-ItemProperty `
    "IIS:\Sites\$iisSite" `
    -Name physicalPath `
    -Value $publishPath


# ==========================
# Start IIS Application Pool
# ==========================

Write-Host "Starting IIS Application Pool: $appPool"

Start-WebAppPool -Name $appPool

Write-Host ""
Write-Host "Deployment completed successfully."
Write-Host "New path: $publishPath"









