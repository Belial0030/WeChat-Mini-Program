@echo off
chcp 65001 >nul
setlocal
cd /d "%~dp0"
title 网络安全培训发布演示版 - 管理后台
echo [发布演示版] %DATE% %TIME%
echo [项目目录] "%~dp0"
echo.

where node.exe >nul 2>&1
if errorlevel 1 goto missing_node

node.exe "%~dp0tools\start-project.cjs" admin
set "PROJECT_START_EXIT=%ERRORLEVEL%"
if not "%PROJECT_START_EXIT%"=="0" goto finish
if /i "%~1"=="--no-browser" goto finish

echo [浏览器] 正在打开管理后台页面……
start "" "http://localhost:8080/cybersecurityknowledge/admin/dist/index.html#/login"
if errorlevel 1 echo [提示] 浏览器未能自动打开，请复制上面的网址访问。
goto finish

:missing_node
echo [错误] 未找到 Node.js，请确认已安装并加入 PATH。
set "PROJECT_START_EXIT=1"

:finish
echo.
if /i not "%~1"=="--no-browser" pause
exit /b %PROJECT_START_EXIT%
