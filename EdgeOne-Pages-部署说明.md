# 🚀 EdgeOne Pages 部署说明

## 📋 根据官方文档修复404问题

根据[EdgeOne Pages排障指南](https://edgeone.cloud.tencent.com/pages/document/176994654809202688)，我们已经修复了以下问题：

### ✅ 已修复的问题

#### 1. **根目录index.html文件**
- ✅ 已将`public/index.html`复制到根目录
- ✅ EdgeOne Pages现在可以找到入口文件

#### 2. **edgeone.json配置文件**
- ✅ 创建了符合EdgeOne Pages标准的配置文件
- ✅ 配置了正确的构建输出目录：`public`
- ✅ 设置了重定向规则：`/*` → `/index.html`
- ✅ 配置了CORS头信息
- ✅ 添加了环境变量

#### 3. **构建配置优化**
- ✅ 更新了`package.json`的构建脚本
- ✅ 确保构建过程符合EdgeOne Pages要求

## 🔧 EdgeOne Pages控制台配置

### 第一步：项目设置

1. **构建配置**：
   ```
   构建命令: npm run build
   输出目录: public
   根目录: /
   ```

2. **环境变量**：
   ```
   NODE_ENV=production
   MONGODB_USERNAME=terry07590759
   MONGODB_PASSWORD=Na0E6iNR4p3gGNg1
   MONGODB_CLUSTER=cluster0.zqsy7.mongodb.net
   MONGODB_DATABASE=Leshan20250911
   MONGODB_COLLECTION=price_template
   ```

### 第二步：Pages Functions配置

1. **创建Edge Function**：
   ```
   函数名称: leshan-furniture-api
   入口文件: index.js
   处理函数: handler
   运行时: Node.js 18.x
   ```

2. **配置路由**：
   ```
   路径: /api/*
   目标: Edge Function
   函数: leshan-furniture-api
   ```

### 第三步：部署和测试

1. **重新部署项目**
2. **测试访问**：
   - 首页：`https://leshan916-2zukmkjd.zh-cn.edgeone.run/`
   - API：`https://leshan916-2zukmkjd.zh-cn.edgeone.run/api/prices`

## 📁 项目结构说明

```
leshan-furniture-system/
├── index.html              # ✅ 根目录入口文件（EdgeOne Pages要求）
├── index.js                # ✅ Edge Function（API处理）
├── edgeone.json           # ✅ EdgeOne Pages配置
├── package.json           # ✅ 构建配置
├── public/                # ✅ 静态资源目录
│   └── index.html         # ✅ 前端页面
└── config.js              # ✅ 配置文件
```

## 🔍 关键修复点

### 1. **根目录index.html**
根据官方文档：
> 可排查上传的文件夹根目录下有没有 index.html 文件。

**解决方案**：已将`public/index.html`复制到根目录。

### 2. **edgeone.json配置**
创建了符合EdgeOne Pages标准的配置文件：
- 构建输出目录：`public`
- 重定向规则：`/*` → `/index.html`
- CORS头配置
- 环境变量配置

### 3. **构建配置**
更新了构建脚本，确保符合EdgeOne Pages要求。

## ✅ 部署检查清单

- [ ] 根目录有`index.html`文件
- [ ] `edgeone.json`配置正确
- [ ] 构建命令配置正确
- [ ] 环境变量已设置
- [ ] Edge Function已配置
- [ ] 路由规则已设置
- [ ] 项目已重新部署

## 🎯 预期结果

完成以上配置后：
1. **首页应该正常显示**：不再出现404错误
2. **API应该正常工作**：可以获取价格数据
3. **静态资源正常加载**：CSS、JS等文件正常

如果仍有问题，请检查：
1. EdgeOne Pages控制台的构建日志
2. Edge Function的执行日志
3. 网络请求的响应状态

根据官方文档，这些修复应该能解决404问题！
