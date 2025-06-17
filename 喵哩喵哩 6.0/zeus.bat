@echo off
:menu
cls
echo ============================
echo 1. zeus dev
echo 2. zeus preview
echo ============================
set /p choice=please print number

if "%choice%"=="1" (
    powershell -NoExit -Command "zeus dev"
    goto end
) else if "%choice%"=="2" (
    powershell -NoExit -Command "zeus preview"
    goto end
) else if "%choice%"=="0" (
    goto end
) else (
    echo cnm。
    pause
    goto menu
)

:end
