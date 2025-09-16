# Vercel大陆访问优化方案

## 方案1：自定义域名 + 国内CDN

### 步骤1：购买域名
- 推荐：阿里云、腾讯云、华为云
- 域名：如 `leshan-furniture.com`

### 步骤2：配置Vercel自定义域名
1. 在Vercel项目设置中添加自定义域名
2. 配置DNS解析到Vercel
3. 启用HTTPS证书

### 步骤3：配置国内CDN
- 阿里云CDN
- 腾讯云CDN
- 华为云CDN

## 方案2：使用国内云服务商

### 推荐平台：
1. **阿里云函数计算**
2. **腾讯云云开发**
3. **华为云FunctionGraph**
4. **百度智能云**

## 方案3：EdgeOne Pages优化

### 优势：
- 腾讯云国内服务
- 国内访问速度快
- 无需翻墙

### 配置步骤：
1. 修复EdgeOne Pages配置
2. 使用国内GitHub镜像
3. 配置国内CDN加速
