#!/bin/bash

# 国内镜像部署脚本
echo "🚀 开始部署到国内云服务商..."

# 1. 阿里云函数计算部署
echo "📦 准备阿里云函数计算部署..."
if command -v serverless &> /dev/null; then
    echo "✅ Serverless Framework 已安装"
    serverless deploy --region cn-hangzhou
else
    echo "❌ 请先安装 Serverless Framework: npm install -g serverless"
fi

# 2. 腾讯云云开发部署
echo "📦 准备腾讯云云开发部署..."
if command -v tcb &> /dev/null; then
    echo "✅ 腾讯云云开发 CLI 已安装"
    tcb functions:deploy
else
    echo "❌ 请先安装腾讯云云开发 CLI: npm install -g @cloudbase/cli"
fi

# 3. 华为云FunctionGraph部署
echo "📦 准备华为云FunctionGraph部署..."
if command -v fgs &> /dev/null; then
    echo "✅ 华为云FunctionGraph CLI 已安装"
    fgs function deploy
else
    echo "❌ 请先安装华为云FunctionGraph CLI"
fi

echo "✅ 国内部署完成！"
