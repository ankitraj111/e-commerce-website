@echo off
REM ShopHub Setup Script for Windows
REM This script automates the setup process for ShopHub

echo.
echo ============================================
echo    ShopHub Setup Script for Windows
echo ============================================
echo.

REM Check if Node.js is installed
echo Checking Node.js...
where node >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo [ERROR] Node.js is not installed. Please install Node.js 18+ first.
    pause
    exit /b 1
)
echo [OK] Node.js found
node -v

REM Check if Java is installed
echo.
echo Checking Java...
where java >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo [ERROR] Java is not installed. Please install Java 17+ first.
    pause
    exit /b 1
)
echo [OK] Java found
java -version

REM Check if PostgreSQL is installed
echo.
echo Checking PostgreSQL...
where psql >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo [WARNING] PostgreSQL command line tools not found in PATH.
    echo Please ensure PostgreSQL 12+ is installed.
)

REM Install frontend dependencies
echo.
echo Installing Frontend Dependencies...
call npm install
if %ERRORLEVEL% NEQ 0 (
    echo [ERROR] Failed to install dependencies
    pause
    exit /b 1
)

REM Setup environment file
echo.
echo Setting up environment files...
if not exist .env.local (
    copy .env.example .env.local
    echo [OK] Created .env.local
    echo [INFO] Please update .env.local with your configuration
) else (
    echo [INFO] .env.local already exists
)

REM Build backend
echo.
echo Building Backend...
cd backend
call mvn clean install -DskipTests
if %ERRORLEVEL% NEQ 0 (
    echo [ERROR] Backend build failed
    cd ..
    pause
    exit /b 1
)
cd ..

echo.
echo ============================================
echo    Setup Complete!
echo ============================================
echo.
echo To start the application:
echo.
echo Frontend:
echo   npm run dev
echo.
echo Backend:
echo   cd backend
echo   mvn spring-boot:run
echo.
echo Visit http://localhost:3000 to see your application!
echo.
pause
