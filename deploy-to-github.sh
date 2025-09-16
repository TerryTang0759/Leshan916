#!/bin/bash

echo "🚀 乐山家具定制系统 - GitHub部署脚本"
echo "=================================="
echo ""

# 检查是否已初始化Git
if [ ! -d ".git" ]; then
    echo "📦 初始化Git仓库..."
    git init
    echo "✅ Git仓库初始化完成"
    echo ""
fi

# 添加所有文件
echo "📁 添加文件到Git..."
git add .
echo "✅ 文件添加完成"
echo ""

# 提交更改
echo "💾 提交更改..."
git commit -m "Initial commit: 乐山家具定制报价系统 - 准备部署到Vercel"
echo "✅ 提交完成"
echo ""

# 设置主分支
echo "🌿 设置主分支..."
git branch -M main
echo "✅ 主分支设置完成"
echo ""

echo "📋 下一步操作："
echo "1. 在GitHub上创建新仓库"
echo "2. 复制仓库URL"
echo "3. 运行以下命令："
echo "   git remote add origin <你的仓库URL>"
echo "   git push -u origin main"
echo ""
echo "4. 然后在Vercel中导入GitHub仓库进行部署"
echo ""
echo "🎉 准备完成！"
