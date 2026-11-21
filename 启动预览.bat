@echo off
chcp 65001 >nul
echo 正在打开 VPN 评测与推荐站点...
start "" "%~dp0index.html"
exit
