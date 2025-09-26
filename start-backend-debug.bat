@echo off
echo Starting GDP Backend Server in DEBUG mode...
echo.

REM Change to the backend directory
cd gdp-backend

REM Check if node_modules exists
if not exist "node_modules" (
    echo Installing dependencies...
    npm install
    echo.
)

REM Start the backend server in debug mode
echo Starting server in DEBUG mode on http://localhost:3000
echo Debug port: 9229 (for VS Code debugger)
echo Press Ctrl+C to stop the server
echo.
npm run debug

REM Keep the window open if there's an error
if errorlevel 1 (
    echo.
    echo Debug server stopped with an error. Press any key to exit...
    pause >nul
)
