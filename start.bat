@echo off
echo ========================================
echo AI跨学科思维教练：论文灵感炼金炉
echo ========================================
echo.

echo 正在启动后端服务...
cd server
start "后端服务" cmd /k "npm install && npm run dev"

echo 等待后端服务启动...
timeout /t 5 /nobreak > nul

echo 正在启动前端服务...
cd ..
start "前端服务" cmd /k "npm install && npm run dev"

echo.
echo ========================================
echo 服务启动完成！
echo ========================================
echo 前端地址: http://localhost:5173
echo 后端地址: http://localhost:3000
echo.
echo 按任意键退出...
pause > nul 