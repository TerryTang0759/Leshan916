#!/bin/bash

# 乐山家具定制系统 - 自动部署脚本
# 用于将项目部署到GitHub和Vercel

echo "🏠 乐山家具定制系统 - 自动部署脚本"
echo "=================================="

# 检查Git状态
echo "📋 检查Git状态..."
if [ -d ".git" ]; then
    echo "✅ Git仓库已初始化"
    
    # 添加所有文件
    echo "📁 添加文件到Git..."
    git add .
    
    # 提交更改
    echo "💾 提交更改..."
    git commit -m "feat: 更新乐山家具定制系统

- 添加材质选择下拉菜单搜索功能
- 支持实时搜索和键盘导航
- 优化用户界面和交互体验
- 准备部署到Vercel"

    # 尝试推送到GitHub
    echo "🚀 推送到GitHub..."
    if git push origin main; then
        echo "✅ 代码已成功推送到GitHub"
    else
        echo "❌ 推送到GitHub失败，请手动上传文件"
        echo "📖 请参考 部署指南.md 中的手动上传步骤"
    fi
else
    echo "❌ 未找到Git仓库，请先初始化Git"
    echo "💡 运行: git init && git remote add origin https://github.com/TerryTang0759/Leshan911.git"
fi

echo ""
echo "🌐 下一步：配置Vercel部署"
echo "1. 访问 https://vercel.com"
echo "2. 使用GitHub账号登录"
echo "3. 点击 'New Project'"
echo "4. 选择 'TerryTang0759/Leshan911' 仓库"
echo "5. 配置环境变量（参考部署指南.md）"
echo "6. 点击 'Deploy'"
echo ""
echo "📖 详细步骤请参考: 部署指南.md"
echo "🎉 部署完成后，您的网站将自动运行！"
