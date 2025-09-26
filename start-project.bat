@echo off
title GDP Project - Backend & Frontend Launcher
echo ================================
echo  GDP Project Startup Launcher
echo ================================
echo.
echo Choose an option:
echo 1. Start Backend Only
echo 2. Start Backend in DEBUG mode
echo 3. Start Frontend Only  
echo 4. Start Both Backend and Frontend
echo 5. Start Backend (DEBUG) + Frontend
echo 6. Exit
echo.
set /p choice="Enter your choice (1-6): "

if "%choice%"=="1" goto backend
if "%choice%"=="2" goto backend_debug
if "%choice%"=="3" goto frontend
if "%choice%"=="4" goto both
if "%choice%"=="5" goto both_debug
if "%choice%"=="6" goto exit
goto invalid

:backend
echo.
echo Starting Backend Server...
start "PDF-App Backend" cmd /k "cd backend && npm start"
goto end

:backend_debug
echo.
echo Starting Backend Server in DEBUG mode...
start "PDF-App Backend DEBUG" cmd /k "cd backend && npm run debug"
goto end

:frontend
echo.
echo Starting Frontend App...
start "PDF-App Frontend" cmd /k "cd frontend && npm start"
goto end

:both
echo.
echo Starting Backend Server...
start "GDP Backend" cmd /k "cd backend && npm start"
timeout /t 3 >nul
echo Starting Frontend App...
start "GDP Frontend" cmd /k "cd frontend && npm start"
goto end

:both_debug
echo.
echo Starting Backend Server in DEBUG mode...
start "GDP Backend DEBUG" cmd /k "cd backend && npm run debug"
timeout /t 3 >nul
echo Starting Frontend App...
start "GDP Frontend" cmd /k "cd frontend && npm start"
goto end

:invalid
echo Invalid choice. Please try again.
pause
goto start

:exit
echo Goodbye!
goto end

:end
echo.
echo Services are starting in separate windows...
echo You can close this window now.
pause
