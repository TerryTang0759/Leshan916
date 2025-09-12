# 🏠 乐山家具定制报价系统

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/your-username/leshan-furniture-system)

一个集成MongoDB云数据库的专业家具定制报价计算系统，支持复杂的柜体、门板、铰链等组件的精确计算。

## ✨ 系统特色

### 🔥 核心功能
- **智能柜体计算**: 支持自动展开面积计算和手动输入两种模式
- **精确门板计算**: 全覆盖/非全覆盖模式，支持玻璃门特殊处理
- **智能铰链计算**: 根据门高自动计算铰链数量（每50cm一个）
- **开放空间处理**: 支持柜体开放空间的独立计算
- **实时价格同步**: MongoDB云数据库实时价格数据
- **多材质支持**: 柜体、门板、铰链独立材质选择

### 🚀 技术架构
- **前端**: 原生HTML5 + CSS3 + JavaScript
- **后端**: Node.js + Express.js
- **数据库**: MongoDB Atlas云数据库
- **部署**: 支持Vercel、EdgeOne等云平台

## 🛠️ 快速开始

### 本地开发
```bash
# 克隆项目
git clone https://github.com/your-username/leshan-furniture-system.git
cd leshan-furniture-system

# 安装依赖
npm install

# 启动服务器
npm start
```

访问 http://localhost:3000

### 云平台部署

#### Vercel部署（推荐）
1. Fork本仓库到您的GitHub
2. 登录 [Vercel](https://vercel.com)
3. 导入GitHub仓库
4. 配置环境变量（见下方）
5. 一键部署

#### 环境变量配置
```bash
MONGODB_USERNAME=your_mongodb_username
MONGODB_PASSWORD=your_mongodb_password  
MONGODB_CLUSTER=your_cluster.mongodb.net
MONGODB_DATABASE=your_database_name
MONGODB_COLLECTION=price_template
NODE_ENV=production
```

## 📊 数据管理

### CSV数据导入
```bash
# 使用CSV模板导入价格数据
npm run import-csv
```

支持的CSV格式：
- `price_template.csv`: 完整价格模板
- `price_simple_template.csv`: 简化测试模板

### JSON数据导入
```bash
# 导入示例价格数据
npm run import-prices
```

## 🎯 高级计算功能

### 柜体计算公式
```
柜体面积 = 顶板 + 底板 + 左右侧板 + 背板 + 横隔板 + 竖隔板
= 2×(宽×深) + 2×(深×高) + (宽×高) + 横隔板×(宽×深) + 竖隔板×(深×高)
```

### 门板计算
- **全覆盖**: 门板数 × (宽 × 高)
- **非全覆盖**: 门板数 × (单扇门宽 × 单扇门高)

### 铰链计算
```
每扇门铰链数 = ⌊门高/50⌋ + 1
总铰链数 = 门板数 × 每扇门铰链数
```

## 📁 项目结构

```
leshan-furniture-system/
├── server.js                 # Express服务器
├── config.js                 # 配置文件
├── package.json              # 项目依赖
├── vercel.json               # Vercel部署配置
├── .gitignore               # Git忽略文件
├── public/                  # 前端静态文件
│   └── index.html          # 主页面
├── import-csv.js           # CSV导入脚本
├── import-prices.js        # JSON导入脚本
├── price_template.csv      # 价格模板
├── sample-prices.json      # 示例数据
└── docs/                   # 文档目录
    ├── GitHub部署指南.md
    └── CSV导入指南.md
```

## 🔌 API接口

### 获取价格数据
```
GET /api/prices
返回所有材质价格信息

GET /api/prices?category=柜体板材
按类别筛选价格信息

GET /api/prices?search=实木
搜索特定材质
```

### 系统状态
```
GET /api/health
返回系统运行状态和MongoDB连接状态
```

## 🎨 界面特色

- 🌟 现代化响应式设计
- 📱 移动端适配
- 🎯 直观的计算界面
- 📊 实时报价表格
- 💡 智能计算提示
- 🔄 MongoDB连接状态指示器

## 🔒 安全特性

- 环境变量保护敏感信息
- CORS跨域安全配置
- MongoDB连接加密
- 输入数据验证

## 📈 性能优化

- 静态资源CDN加速
- MongoDB连接池管理
- 前端计算缓存
- 响应式图片加载

## 🆘 故障排除

### 常见问题
1. **MongoDB连接失败**: 检查环境变量和网络访问设置
2. **API超时**: 优化查询或升级部署方案
3. **计算错误**: 验证输入数据格式
4. **静态文件404**: 检查路由配置

### 调试工具
- 浏览器开发者工具
- 服务器日志输出
- MongoDB Atlas监控
- Vercel部署日志

## 📞 技术支持

- 📧 邮箱支持: support@leshan-furniture.com
- 💬 在线客服: 工作日 9:00-18:00
- 📖 文档中心: [查看完整文档](./docs/)
- 🐛 问题反馈: [GitHub Issues](https://github.com/your-username/leshan-furniture-system/issues)

## 📄 许可证

MIT License - 详见 [LICENSE](LICENSE) 文件

---

<div align="center">
  <strong>🏠 乐山家具定制 - 专业、精准、高效 ✨</strong><br>
  <em>让每一个定制需求都有精确的价格计算</em>
</div># Leshan912
# Leshan912
