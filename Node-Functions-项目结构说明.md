# 🚀 EdgeOne Pages Node Functions 项目结构说明

## 📋 根据官方文档迁移到Node Functions

根据[EdgeOne Pages Node Functions文档](https://edgeone.cloud.tencent.com/pages/document/184787642236784640)，我们已将项目从Edge Functions迁移到Node Functions，以获得更好的MongoDB支持。

### 📂 **新的项目结构**

```
leshan-furniture-system/
├── node-functions/             # ✅ Node Functions目录（官方要求）
│   └── api/                   # ✅ API路由目录
│       ├── prices.js          # ✅ 价格数据API
│       ├── health.js          # ✅ 健康检查API
│       └── [[default]].js     # ✅ 默认API处理
├── edge-functions/            # ✅ 保留Edge Functions（兼容性）
│   └── api/                   # ✅ 原有API函数
├── public/                    # ✅ 静态资源目录
├── index.html                 # ✅ 根目录入口文件
├── edgeone.json              # ✅ EdgeOne Pages配置
└── package.json              # ✅ 项目配置
```

### 🔧 **Node Functions vs Edge Functions对比**

| 特性 | Edge Functions | Node Functions |
|------|----------------|----------------|
| **MongoDB支持** | 受限 | ✅ **完全支持** |
| **npm包支持** | 受限 | ✅ **完全支持** |
| **代码包大小** | 5MB | ✅ **128MB** |
| **运行时长** | 200ms CPU | ✅ **30s** |
| **开发语言** | JavaScript | ✅ **Node.js v20.x** |
| **请求body大小** | 1MB | ✅ **6MB** |

### 🚀 **Node Functions 优势**

#### 1. **完全兼容Node.js**
- ✅ 原生支持所有Node.js API
- ✅ 无障碍使用npm包生态
- ✅ 支持MongoDB等数据库驱动

#### 2. **路由即服务**
- ✅ 通过文件系统定义API路由
- ✅ 快速开发与部署
- ✅ 像管理前端页面一样便捷

#### 3. **Serverless架构**
- ✅ 无需配置或管理服务器
- ✅ 根据业务负载智能扩容
- ✅ 专注于业务代码开发

#### 4. **全栈开发体验**
- ✅ 前后端项目统一管理
- ✅ 同一项目中完成开发和部署
- ✅ 大幅提升协作效率

### 📋 **路由映射**

根据官方文档，Node Functions基于`/node-functions`目录结构生成访问路由：

| 文件路径 | 路由 | 功能 |
|---------|------|------|
| `/node-functions/api/prices.js` | `/api/prices` | MongoDB价格数据API |
| `/node-functions/api/health.js` | `/api/health` | 健康检查API |
| `/node-functions/api/[[default]].js` | `/api/*` | 默认API处理 |

### 🔧 **Node Functions特性**

#### 1. **增强的Context对象**
```javascript
const { request, env, clientIp, geo, server } = context;
// - clientIp: 客户端IP地址
// - geo: 客户端地理位置信息
// - server: 服务器信息（region, requestId）
```

#### 2. **完整的MongoDB支持**
- ✅ 支持所有MongoDB驱动功能
- ✅ 连接池管理
- ✅ 事务支持
- ✅ 聚合查询

#### 3. **丰富的npm生态**
- ✅ 所有Node.js包可用
- ✅ 数据库ORM支持
- ✅ 第三方API集成

### 🧪 **测试方法**

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
  "timestamp": "2025-01-16T...",
  "clientInfo": {
    "ip": "xxx.xxx.xxx.xxx",
    "geo": {...}
  }
}
```

### 🔍 **调试方法**

#### 1. **本地调试**
```bash
# 安装EdgeOne CLI
npm install -g edgeone

# 启动本地开发服务器
edgeone pages dev
```

#### 2. **生产环境调试**
- 查看EdgeOne Pages控制台的Node Functions日志
- 检查MongoDB连接状态
- 验证环境变量配置

### ✅ **部署优势**

#### 1. **性能提升**
- ✅ 更大的代码包支持（128MB vs 5MB）
- ✅ 更长的运行时间（30s vs 200ms）
- ✅ 更大的请求体支持（6MB vs 1MB）

#### 2. **开发体验**
- ✅ 完整的Node.js生态支持
- ✅ 更好的MongoDB集成
- ✅ 更丰富的调试信息

#### 3. **运维优势**
- ✅ 统一的日志分析
- ✅ 更好的错误追踪
- ✅ 完整的性能监控

### 🎯 **部署步骤**

1. **提交代码到GitHub**（已完成）
2. **在EdgeOne Pages控制台重新部署**
3. **测试Node Functions API端点**
4. **验证MongoDB连接**

### 📊 **预期结果**

使用Node Functions后应该看到：
- ✅ 更好的MongoDB连接稳定性
- ✅ 更丰富的调试信息
- ✅ 更快的API响应速度
- ✅ 更完整的错误处理

这个新结构完全符合EdgeOne Pages Node Functions的官方标准，应该能彻底解决MongoDB连接问题！
