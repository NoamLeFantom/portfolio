@echo off

:: Démarrer le serveur frontend
start cmd /k "cd /d %~dp0frontend && npm start"

:: Démarrer le serveur backend
start cmd /k "cd /d %~dp0backend && node index.js"

pause
