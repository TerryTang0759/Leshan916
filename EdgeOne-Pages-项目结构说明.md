# 🏗️ EdgeOne Pages 项目结构说明

## 📁 根据官方文档重新构建的项目结构

根据[EdgeOne Pages Edge Functions文档](https://edgeone.cloud.tencent.com/pages/document/184787623566569472)，我们重新构建了符合EdgeOne Pages标准的项目结构。

### 📂 新的项目结构

```
leshan-furniture-system/
├── edge-functions/              # ✅ Edge Functions目录（官方要求）
│   └── api/                    # ✅ API路由目录
│       ├── prices.js           # ✅ 价格数据API
│       ├── health.js           # ✅ 健康检查API
│       └── [[default]].js      # ✅ 默认API处理
├── public/                     # ✅ 静态资源目录
│   └── index.html              # ✅ 前端页面
├── index.html                  # ✅ 根目录入口文件
├── edgeone.json               # ✅ EdgeOne Pages配置
├── package.json               # ✅ 项目配置
└── config.js                  # ✅ 配置文件
```

### 🔧 Edge Functions 路由映射

根据官方文档，Edge Functions基于`/edge-functions`目录结构生成访问路由：

| 文件路径 | 路由 | 功能 |
|---------|------|------|
| `/edge-functions/api/prices.js` | `/api/prices` | MongoDB价格数据API |
| `/edge-functions/api/health.js` | `/api/health` | 健康检查API |
| `/edge-functions/api/[[default]].js` | `/api/*` | 默认API处理 |

### 🚀 Edge Functions 特性

#### 1. **符合官方标准**
- ✅ 使用ES6模块语法 (`import/export`)
- ✅ 使用官方Handler方法 (`onRequestGet`, `onRequestOptions`)
- ✅ 支持动态路由 (`[[default]]`)
- ✅ 完整的CORS支持

#### 2. **MongoDB集成**
- ✅ 直接连接MongoDB Atlas
- ✅ 支持查询参数过滤
- ✅ 完整的错误处理
- ✅ 连接池管理

#### 3. **性能优化**
- ✅ 边缘节点部署（3200+节点）
- ✅ 超低延迟响应
- ✅ 自动弹性扩容
- ✅ Serverless架构

### 📋 配置说明

#### 1. **edgeone.json配置**
```json
{
  "name": "leshan-furniture-system",
  "build": {
    "command": "npm run build",
    "output": "public"
  },
  "headers": [
    {
      "source": "/api/*",
      "headers": [
        {
          "key": "Access-Control-Allow-Origin",
          "value": "*"
        }
      ]
    }
  ],
  "environment": {
    "MONGODB_USERNAME": "terry07590759",
    "MONGODB_PASSWORD": "Na0E6iNR4p3gGNg1",
    "MONGODB_CLUSTER": "cluster0.zqsy7.mongodb.net",
    "MONGODB_DATABASE": "Leshan20250911",
    "MONGODB_COLLECTION": "price_template"
  }
}
```

#### 2. **Edge Functions特点**
- **自动路由**：基于文件路径自动生成API路由
- **类型安全**：支持TypeScript（可选）
- **标准Web APIs**：支持Fetch、Headers、Response等
- **边缘部署**：自动部署到最近的边缘节点

### 🧪 测试方法

#### 1. **API端点测试**
```
GET /api/prices          # 获取所有价格数据
GET /api/prices?category=cabinet  # 获取柜体价格
GET /api/health          # 健康检查
```

#### 2. **预期响应格式**
```json
{
  "success": true,
  "data": [...],
  "count": 53,
  "timestamp": "2025-01-16T..."
}
```

### 🔍 调试方法

#### 1. **本地调试**
```bash
# 安装EdgeOne CLI
npm install -g edgeone

# 启动本地开发服务器
edgeone pages dev
```

#### 2. **生产环境调试**
- 查看EdgeOne Pages控制台的函数日志
- 检查MongoDB连接状态
- 验证环境变量配置

### ✅ 优势对比

| 特性 | 旧结构 | 新结构（Edge Functions） |
|------|--------|-------------------------|
| 部署方式 | 传统服务器 | 边缘节点（3200+） |
| 延迟 | 较高 | 超低延迟 |
| 扩展性 | 手动配置 | 自动弹性扩容 |
| 维护成本 | 高 | 低（Serverless） |
| 性能 | 一般 | 优秀（边缘计算） |

### 🎯 部署步骤

1. **提交代码到GitHub**
2. **在EdgeOne Pages控制台重新部署**
3. **测试API端点**
4. **验证MongoDB连接**

这个新结构完全符合EdgeOne Pages的官方标准，应该能解决MongoDB连接问题！
