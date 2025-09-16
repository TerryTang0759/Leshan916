#!/bin/bash

echo "🚀 乐山家具定制系统 - EdgeOne部署脚本"
echo "=================================="
echo ""

# 检查腾讯云CLI是否安装
if ! command -v tccli &> /dev/null
then
    echo "❌ 错误：未检测到腾讯云CLI，请先安装"
    echo "   安装指南：https://cloud.tencent.com/document/product/440/34011"
    echo "   或使用：pip install tccli"
    exit 1
fi

echo "✅ 腾讯云CLI已安装"
echo ""

# 检查配置文件
if [ ! -f "edgeone-config.json" ]; then
    echo "❌ 错误：未找到edgeone-config.json配置文件"
    exit 1
fi

echo "📋 部署配置："
echo "  项目名称: 乐山家具定制系统"
echo "  运行时: Node.js 18"
echo "  入口文件: server.js"
echo ""

# 创建部署包
echo "📦 创建部署包..."
zip -r leshan-furniture-edgeone.zip . -x "node_modules/*" ".git/*" "*.log" ".DS_Store"

if [ $? -ne 0 ]; then
    echo "❌ 创建部署包失败"
    exit 1
fi

echo "✅ 部署包创建完成: leshan-furniture-edgeone.zip"
echo ""

echo "📋 下一步操作："
echo "1. 登录腾讯云控制台"
echo "2. 进入EdgeOne服务"
echo "3. 创建边缘函数"
echo "4. 上传部署包: leshan-furniture-edgeone.zip"
echo "5. 配置环境变量（参考edgeone-config.json）"
echo "6. 绑定域名和路由"
echo ""
echo "🎉 准备完成！"
