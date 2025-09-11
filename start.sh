#!/bin/bash

# 乐山家具定制系统 - 整合版启动脚本

echo "🏠 乐山家具定制系统 - 整合版"
echo "================================"
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

# 导入价格数据
echo "📊 正在导入价格数据到MongoDB..."
npm run import-prices

if [ $? -ne 0 ]; then
    echo "⚠️  价格数据导入失败，但系统仍可使用本地备用数据"
fi

echo ""

# 启动服务器
echo "🚀 正在启动后端服务器..."
echo ""

npm start
