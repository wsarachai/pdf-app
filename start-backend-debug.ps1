# GDP Backend Server Debug Startup Script
Write-Host "Starting GDP Backend Server in DEBUG mode..." -ForegroundColor Green
Write-Host ""

# Change to the backend directory
Set-Location "gdp-backend"

# Check if node_modules exists
if (-not (Test-Path "node_modules")) {
  Write-Host "Installing dependencies..." -ForegroundColor Yellow
  npm install
  Write-Host ""
}

# Start the backend server in debug mode
Write-Host "Starting server in DEBUG mode on http://localhost:3000" -ForegroundColor Cyan
Write-Host "Debug port: 9229 (for VS Code debugger)" -ForegroundColor Magenta
Write-Host "Press Ctrl+C to stop the server" -ForegroundColor Yellow
Write-Host ""

try {
  npm run debug
}
catch {
  Write-Host ""
  Write-Host "Debug server stopped with an error: $($_.Exception.Message)" -ForegroundColor Red
  Write-Host "Press any key to exit..." -ForegroundColor Yellow
  $null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")
}
