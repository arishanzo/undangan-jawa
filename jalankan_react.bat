@echo off
title Menjalankan Undangan Jawa React...
cd /d "%~dp0"
echo ========================================================
echo  MEMULAI SERVER UNDANGAN ADAT JAWA (REACT.JS)
echo ========================================================
echo.
echo URL Halaman:
echo - Halaman Undangan Tamu        : http://localhost:3000/
echo - Halaman Kelola & Bagikan Tamu: http://localhost:3000/tamu
echo.
start "" "http://localhost:3000/tamu"
cmd /c "npm.cmd run dev"
pause
