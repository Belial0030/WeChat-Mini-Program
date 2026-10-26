@echo off
chcp 65001 >nul
setlocal
cd /d "%~dp0"
title 网络安全培训发布演示版 - 后端接口
echo [发布演示版] %DATE% %TIME%
echo [项目目录] "%~dp0"
echo.

where node.exe >nul 2>&1
if errorlevel 1 goto missing_node

node.exe "%~dp0tools\start-project.cjs" backend
set "PROJECT_START_EXIT=%ERRORLEVEL%"
if "%PROJECT_START_EXIT%"=="0" echo [说明] 后端脚本只启动接口。需要网页，请运行“启动管理后台.bat”。
goto finish

:missing_node
echo [错误] 未找到 Node.js，请确认已安装并加入 PATH。
set "PROJECT_START_EXIT=1"

:finish
echo.
if /i not "%~1"=="--no-pause" pause
exit /b %PROJECT_START_EXIT%
