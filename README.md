# 乐山家具定制报价系统

一个基于Node.js和MongoDB的家具定制报价系统，支持多种家具类型的价格计算和报价生成。

## 功能特性

- 🏠 多种家具类型支持（柜体、门板、墙板、岛台等）
- 📊 智能价格计算（面积、长度、数量）
- 🎨 材质选择和数据管理
- 📱 响应式Web界面
- ☁️ 云端数据存储（MongoDB Atlas）

## 技术栈

- **后端**: Node.js + Express
- **数据库**: MongoDB Atlas
- **前端**: HTML + CSS + JavaScript
- **部署**: Vercel

## 快速开始

### 本地开发

1. 克隆项目
```bash
git clone <your-repo-url>
cd leshan-furniture-system
```

2. 安装依赖
```bash
npm install
```

3. 配置环境变量
```bash
cp env.template .env
# 编辑 .env 文件，填入您的MongoDB连接信息
```

4. 启动服务器
```bash
npm start
```

5. 访问系统
- 前端界面: http://localhost:3000
- API接口: http://localhost:3000/api/prices

### Vercel部署

1. 将代码推送到GitHub
2. 在Vercel中导入GitHub仓库
3. 配置环境变量
4. 自动部署完成

## 环境变量配置

在Vercel项目设置中配置以下环境变量：

```
MONGODB_USERNAME=your_username
MONGODB_PASSWORD=your_password
MONGODB_CLUSTER=your_cluster.mongodb.net
MONGODB_DATABASE=your_database_name
MONGODB_COLLECTION=price_template
```

## 项目结构

```
├── server.js              # 主服务器文件
├── config.js              # 配置文件
├── public/
│   └── index.html         # 前端页面
├── package.json           # 项目配置
├── vercel.json           # Vercel配置
└── env.template          # 环境变量模板
```

## 使用说明

1. 打开系统首页
2. 选择家具类型（柜体、门板、墙板等）
3. 输入尺寸参数（统一使用毫米单位）
4. 选择材质和配件
5. 系统自动计算价格并生成报价单

## 许可证

MIT License
