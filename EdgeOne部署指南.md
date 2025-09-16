# 🌐 乐山家具定制系统 - EdgeOne部署指南

## 📋 部署方案选择

### 方案一：EdgeOne + 云函数（推荐）
- **优势**: 全球加速、边缘计算、自动扩缩容
- **适用**: 高并发、全球用户访问
- **成本**: 按使用量计费

### 方案二：EdgeOne + 轻量应用服务器
- **优势**: 完全控制、成本固定
- **适用**: 稳定访问量、需要持久化存储
- **成本**: 固定月费

### 方案三：EdgeOne + 容器服务
- **优势**: 容器化部署、易于管理
- **适用**: 微服务架构、团队协作
- **成本**: 按资源使用量计费

## 🚀 方案一：EdgeOne + 云函数部署

### 第一步：准备工作

1. **腾讯云账号准备**
   - 注册腾讯云账号
   - 实名认证
   - 开通EdgeOne服务

2. **安装腾讯云CLI（可选）**
   ```bash
   # 使用pip安装
   pip install tccli
   
   # 配置密钥
   tccli configure
   ```

### 第二步：创建部署包

```bash
# 运行部署脚本
./deploy-edgeone.sh
```

或手动创建：
```bash
# 创建部署包（排除不需要的文件）
zip -r leshan-furniture-edgeone.zip . \
  -x "node_modules/*" \
  -x ".git/*" \
  -x "*.log" \
  -x ".DS_Store" \
  -x "deploy-*.sh"
```

### 第三步：EdgeOne控制台配置

1. **登录腾讯云控制台**
   - 访问 https://console.cloud.tencent.com
   - 进入EdgeOne服务

2. **创建边缘函数**
   - 点击"边缘函数"
   - 选择"创建函数"
   - 函数名称：`leshan-furniture-system`
   - 运行时：Node.js 18.x
   - 入口文件：`server.js`

3. **上传代码**
   - 上传 `leshan-furniture-edgeone.zip`
   - 等待部署完成

4. **配置环境变量**
   ```
   NODE_ENV=production
   MONGODB_USERNAME=terry07590759
   MONGODB_PASSWORD=Na0E6iNR4p3gGNg1
   MONGODB_CLUSTER=cluster0.zqsy7.mongodb.net
   MONGODB_DATABASE=Leshan20250911
   MONGODB_COLLECTION=price_template
   ```

5. **配置路由**
   - 路径：`/*`
   - 目标：边缘函数
   - 函数：`leshan-furniture-system`

### 第四步：域名配置

1. **添加域名**
   - 在EdgeOne控制台添加您的域名
   - 例如：`furniture.yourdomain.com`

2. **DNS配置**
   - 将域名CNAME指向EdgeOne提供的地址
   - 等待DNS生效（通常5-10分钟）

3. **SSL证书**
   - EdgeOne自动提供免费SSL证书
   - 支持HTTPS访问

## 🖥️ 方案二：EdgeOne + 轻量应用服务器

### 第一步：购买轻量应用服务器

1. **选择配置**
   - 地域：选择离用户最近的地域
   - 镜像：Ubuntu 20.04 LTS
   - 规格：2核4GB（推荐）
   - 带宽：5Mbps

2. **购买服务器**
   - 选择计费方式（包年包月推荐）
   - 完成支付

### 第二步：服务器配置

1. **连接服务器**
   ```bash
   ssh root@your-server-ip
   ```

2. **安装Node.js**
   ```bash
   # 更新系统
   apt update && apt upgrade -y
   
   # 安装Node.js 18
   curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
   apt-get install -y nodejs
   
   # 验证安装
   node --version
   npm --version
   ```

3. **部署应用**
   ```bash
   # 创建应用目录
   mkdir -p /var/www/leshan-furniture
   cd /var/www/leshan-furniture
   
   # 上传代码（使用scp或git）
   scp -r /path/to/your/project/* root@your-server-ip:/var/www/leshan-furniture/
   
   # 安装依赖
   npm install --production
   
   # 创建环境变量文件
   cat > .env << EOF
   NODE_ENV=production
   MONGODB_USERNAME=terry07590759
   MONGODB_PASSWORD=Na0E6iNR4p3gGNg1
   MONGODB_CLUSTER=cluster0.zqsy7.mongodb.net
   MONGODB_DATABASE=Leshan20250911
   MONGODB_COLLECTION=price_template
   PORT=3000
   EOF
   ```

4. **配置PM2进程管理**
   ```bash
   # 安装PM2
   npm install -g pm2
   
   # 创建PM2配置文件
   cat > ecosystem.config.js << EOF
   module.exports = {
     apps: [{
       name: 'leshan-furniture',
       script: 'server.js',
       instances: 'max',
       exec_mode: 'cluster',
       env: {
         NODE_ENV: 'production',
         PORT: 3000
       }
     }]
   }
   EOF
   
   # 启动应用
   pm2 start ecosystem.config.js
   pm2 save
   pm2 startup
   ```

5. **配置Nginx反向代理**
   ```bash
   # 安装Nginx
   apt install nginx -y
   
   # 创建Nginx配置
   cat > /etc/nginx/sites-available/leshan-furniture << EOF
   server {
       listen 80;
       server_name your-domain.com;
       
       location / {
           proxy_pass http://localhost:3000;
           proxy_http_version 1.1;
           proxy_set_header Upgrade \$http_upgrade;
           proxy_set_header Connection 'upgrade';
           proxy_set_header Host \$host;
           proxy_set_header X-Real-IP \$remote_addr;
           proxy_set_header X-Forwarded-For \$proxy_add_x_forwarded_for;
           proxy_set_header X-Forwarded-Proto \$scheme;
           proxy_cache_bypass \$http_upgrade;
       }
   }
   EOF
   
   # 启用站点
   ln -s /etc/nginx/sites-available/leshan-furniture /etc/nginx/sites-enabled/
   nginx -t
   systemctl restart nginx
   ```

### 第三步：EdgeOne加速配置

1. **添加源站**
   - 在EdgeOne控制台添加您的服务器IP
   - 配置回源协议（HTTP/HTTPS）

2. **配置缓存规则**
   - 静态资源：缓存7天
   - API接口：缓存5分钟
   - HTML页面：缓存1小时

3. **配置安全规则**
   - 开启DDoS防护
   - 配置访问频率限制
   - 设置IP白名单（可选）

## 🐳 方案三：EdgeOne + 容器服务

### 第一步：创建Dockerfile

```dockerfile
FROM node:18-alpine

WORKDIR /app

# 复制package文件
COPY package*.json ./

# 安装依赖
RUN npm ci --only=production

# 复制应用代码
COPY . .

# 暴露端口
EXPOSE 3000

# 启动应用
CMD ["node", "server.js"]
```

### 第二步：构建和推送镜像

```bash
# 构建镜像
docker build -t leshan-furniture:latest .

# 推送到腾讯云容器镜像服务
docker tag leshan-furniture:latest ccr.ccs.tencentyun.com/your-namespace/leshan-furniture:latest
docker push ccr.ccs.tencentyun.com/your-namespace/leshan-furniture:latest
```

### 第三步：部署到容器服务

1. **创建集群**
   - 在腾讯云容器服务创建TKE集群
   - 选择合适的地域和规格

2. **部署应用**
   - 创建Deployment
   - 配置Service
   - 设置Ingress

## 🔧 性能优化建议

### 1. EdgeOne配置优化
- **缓存策略**: 静态资源长期缓存，API短期缓存
- **压缩**: 开启Gzip/Brotli压缩
- **HTTP/2**: 启用HTTP/2支持
- **CDN**: 配置全球CDN节点

### 2. 应用优化
- **数据库连接池**: 优化MongoDB连接
- **内存管理**: 监控内存使用
- **日志管理**: 配置日志轮转
- **监控告警**: 设置性能监控

### 3. 安全配置
- **HTTPS**: 强制HTTPS访问
- **CORS**: 配置跨域策略
- **防火墙**: 配置安全组规则
- **备份**: 定期数据备份

## 📊 成本估算

### EdgeOne + 云函数
- **请求费用**: ¥0.0001/万次
- **计算费用**: ¥0.0000167/GB秒
- **流量费用**: ¥0.8/GB

### EdgeOne + 轻量服务器
- **服务器**: ¥50-200/月
- **流量**: ¥0.8/GB
- **存储**: ¥0.35/GB/月

### EdgeOne + 容器服务
- **集群费用**: ¥100-500/月
- **计算费用**: ¥0.1-0.5/核时
- **存储费用**: ¥0.35/GB/月

## ✅ 部署检查清单

- [ ] 腾讯云账号准备完成
- [ ] 选择部署方案
- [ ] 创建部署包
- [ ] 配置EdgeOne服务
- [ ] 设置环境变量
- [ ] 配置域名和SSL
- [ ] 测试应用访问
- [ ] 配置监控告警
- [ ] 性能优化完成

---

## 🎉 部署完成

选择适合您需求的部署方案，按照指南完成部署后，您的乐山家具定制报价系统就可以通过EdgeOne全球加速访问了！

需要我协助您完成哪个方案的部署？
