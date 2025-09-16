# 乐山家具定制报价系统

一个完整的家具定制报价系统，支持Vercel和EdgeOne Pages双平台部署。

## 🚀 功能特性

- **智能报价计算**：基于尺寸自动计算柜体、门板、五金等价格
- **材料价格管理**：支持MongoDB云数据库存储材料价格
- **多平台部署**：同时支持Vercel和EdgeOne Pages
- **响应式设计**：适配各种设备屏幕

## 🛠 技术栈

- **前端**：HTML5, CSS3, JavaScript (ES6+)
- **后端**：Node.js, Express.js
- **数据库**：MongoDB Atlas
- **部署平台**：Vercel, EdgeOne Pages

## 📁 项目结构

```
乐山家具定制系统-整合版/
├── public/
│   └── index.html          # 前端页面
├── node-functions/
│   └── index.js            # EdgeOne Pages函数
├── config.js               # 配置文件
├── server.js               # Express服务器
├── package.json            # 项目依赖
├── vercel.json             # Vercel配置
├── edgeone.json            # EdgeOne Pages配置
└── README.md               # 项目说明
```

## 🚀 部署指南

### Vercel部署

1. **连接GitHub仓库**
   ```bash
   git remote add origin https://github.com/TerryTang0759/Leshan916.git
   ```

2. **在Vercel控制台导入项目**
   - 选择GitHub仓库
   - 自动检测Node.js项目
   - 配置环境变量

3. **环境变量配置**
   ```
   MONGODB_USERNAME=terry07590759
   MONGODB_PASSWORD=Na0E6iNR4p3gGNg1
   MONGODB_CLUSTER=cluster0.zqsy7.mongodb.net
   MONGODB_DATABASE=Leshan20250911
   MONGODB_COLLECTION=price_template
   ```

### EdgeOne Pages部署

1. **通过MCP部署**
   ```bash
   # 在Cursor中询问AI
   请帮我通过EdgeOne Pages MCP部署这个项目
   ```

2. **手动部署**
   - 在EdgeOne控制台导入GitHub仓库
   - 选择Node.js运行时
   - 配置环境变量

## 🔧 本地开发

1. **安装依赖**
   ```bash
   npm install
   ```

2. **配置环境变量**
   ```bash
   cp env.template .env
   # 编辑.env文件，填入MongoDB连接信息
   ```

3. **启动开发服务器**
   ```bash
   npm start
   ```

4. **访问应用**
   ```
   http://localhost:3000
   ```

## 📊 API接口

### 获取价格数据
```
GET /api/prices
```

### 健康检查
```
GET /api/health
```

## 🌐 访问地址

- **Vercel部署**：https://leshan916.vercel.app
- **EdgeOne Pages**：通过MCP部署后获取

## 📝 更新日志

- **v1.0.0**：初始版本，支持Vercel和EdgeOne Pages双平台部署
- 统一长度单位为毫米(mm)
- 面积显示为平方米(㎡)
- 长度显示为米(m)
- 修复铰链计算逻辑

## 🤝 贡献

欢迎提交Issue和Pull Request来改进这个项目！

## 📄 许可证

MIT License