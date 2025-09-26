@echo off
echo Starting GDP Backend Server...
echo.

REM Change to the backend directory
cd gdp-backend

REM Check if node_modules exists
if not exist "node_modules" (
    echo Installing dependencies...
    npm install
    echo.
)

REM Start the backend server
echo Starting server on http://localhost:3000
echo Press Ctrl+C to stop the server
echo.
npm start

REM Keep the window open if there's an error
if errorlevel 1 (
    echo.
    echo Server stopped with an error. Press any key to exit...
    pause >nul
)
