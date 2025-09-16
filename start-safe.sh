#!/bin/bash

# 乐山家具定制系统 - 安全启动脚本（不覆盖现有数据）

echo "🏠 乐山家具定制系统 - 安全启动版"
echo "=========================================="
echo ""

# 检查Node.js是否安装
if ! command -v node &> /dev/null
then
    echo "❌ 错误：未检测到Node.js，请先安装Node.js"
    echo "   下载地址：https://nodejs.org/"
    exit 1
fi

echo "✅ Node.js版本: $(node --version)"
echo ""

# 安装依赖
echo "📦 正在安装npm依赖..."
npm install

if [ $? -ne 0 ]; then
    echo "❌ npm依赖安装失败"
    exit 1
fi

echo "✅ 依赖安装完成"
echo ""

# 检查MongoDB中的现有数据（不清空）
echo "📊 正在检查MongoDB中的现有数据..."
npm run check-data

if [ $? -ne 0 ]; then
    echo "⚠️  数据检查失败，但系统仍可启动"
fi

echo ""

# 启动服务器
echo "🚀 正在启动后端服务器..."
echo ""

npm start


