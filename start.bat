@echo off
setlocal
cd /d "%~dp0"

where node >nul 2>nul
if errorlevel 1 goto missing_node

where npm >nul 2>nul
if errorlevel 1 goto missing_node

for /f "tokens=1,2 delims=." %%a in ('node -p "process.versions.node"') do (
  set NODE_MAJOR=%%a
  set NODE_MINOR=%%b
)
if %NODE_MAJOR% LSS 18 goto old_node
if %NODE_MAJOR% EQU 18 if %NODE_MINOR% LSS 18 goto old_node

call npm start
if errorlevel 1 (
  echo.
  echo The site could not start. Check the message above, then try again.
  pause
)
exit /b %errorlevel%

:missing_node
echo Node.js 18.18 or newer is required. Install it from https://nodejs.org/ and reopen this file.
start "" "https://nodejs.org/"
pause
exit /b 1

:old_node
echo Node.js 18.18 or newer is required. Your current version is:
node --version
start "" "https://nodejs.org/"
pause
exit /b 1
