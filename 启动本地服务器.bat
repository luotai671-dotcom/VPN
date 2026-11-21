@echo off
chcp 65001 >nul
echo 正在启动本地服务器 (http://localhost:3000)...
start http://localhost:3000
node server.cjs
pause
