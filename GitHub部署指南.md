# 🚀 GitHub部署指南

## 📋 部署准备

### 1. GitHub仓库设置

1. **创建GitHub仓库**
   ```bash
   # 在项目根目录执行
   git init
   git add .
   git commit -m "初始化乐山家具定制系统"
   git branch -M main
   git remote add origin https://github.com/your-username/leshan-furniture-system.git
   git push -u origin main
   ```

2. **更新仓库信息**
   - 修改 `package.json` 中的 `repository.url` 为您的实际GitHub地址
   - 修改 `homepage` 为您的实际部署地址

### 2. 环境变量配置

#### Vercel部署
1. 登录 [Vercel](https://vercel.com)
2. 导入GitHub仓库
3. 在项目设置中添加环境变量：
   ```
   MONGODB_USERNAME=terry07590759
   MONGODB_PASSWORD=Na0E6iNR4p3gGNg1
   MONGODB_CLUSTER=cluster0.zqsy7.mongodb.net
   MONGODB_DATABASE=Leshan20250911
   MONGODB_COLLECTION=price_template
   NODE_ENV=production
   ```

#### EdgeOne部署
1. 登录腾讯云EdgeOne控制台
2. 创建新的边缘函数
3. 配置环境变量（同上）
4. 上传代码包或连接GitHub仓库

## 🔧 部署配置文件说明

### vercel.json
```json
{
  "version": 2,
  "builds": [
    {
      "src": "server.js",
      "use": "@vercel/node"
    }
  ],
  "routes": [
    {
      "src": "/api/(.*)",
      "dest": "/server.js"
    },
    {
      "src": "/(.*)",
      "dest": "/public/$1"
    }
  ]
}
```

### package.json 关键配置
- `engines`: 指定Node.js版本 >=16.x
- `scripts.start`: 生产环境启动命令
- `dependencies`: 包含所有运行时依赖

## 🌐 部署平台特殊配置

### Vercel
- ✅ 自动支持Serverless函数
- ✅ 自动HTTPS
- ✅ 全球CDN
- ✅ 支持自定义域名

### EdgeOne (腾讯云)
- ✅ 边缘计算
- ✅ 国内访问优化
- ✅ 支持自定义域名
- ⚠️ 需要手动配置路由规则

## 🔐 安全注意事项

1. **敏感信息保护**
   - 绝对不要将MongoDB密码提交到GitHub
   - 使用环境变量存储所有敏感配置
   - 检查 `.gitignore` 确保 `.env` 文件被忽略

2. **MongoDB连接安全**
   - 确保MongoDB Atlas网络访问列表包含 `0.0.0.0/0`（允许所有IP）
   - 或者添加您的部署平台IP范围

## 🚀 快速部署步骤

### Vercel一键部署
1. Fork这个仓库到您的GitHub
2. 访问 [Vercel](https://vercel.com/new)
3. 选择您的仓库
4. 添加环境变量
5. 点击部署

### 手动部署
1. 克隆仓库到本地
2. 配置环境变量
3. 推送到GitHub
4. 在部署平台连接仓库

## 📝 部署后验证

1. **访问主页**: `https://your-app.vercel.app/`
2. **测试API**: `https://your-app.vercel.app/api/prices`
3. **检查功能**:
   - MongoDB连接状态
   - 价格数据加载
   - 计算功能正常

## 🔄 更新部署

```bash
# 修改代码后
git add .
git commit -m "更新描述"
git push origin main
# Vercel会自动重新部署
```

## 🆘 常见问题

### 1. MongoDB连接失败
- 检查环境变量是否正确设置
- 确认MongoDB Atlas网络访问设置
- 验证用户名密码是否正确

### 2. 静态文件404
- 检查 `vercel.json` 路由配置
- 确保 `public/` 目录结构正确

### 3. API超时
- Vercel免费版有10秒超时限制
- 优化MongoDB查询性能
- 考虑升级到Pro版本

## 📞 技术支持

如遇到部署问题，请检查：
1. GitHub Actions日志
2. Vercel部署日志
3. 浏览器开发者工具Console
4. MongoDB Atlas连接日志

---
*乐山家具定制系统 - 专业、精准、高效* 🏠✨
