# 🔧 EdgeOne部署说明

## 📋 配置文件已更新

### 1. `edgeone-config.json` 更新内容：

#### ✅ 环境变量配置
```json
"environment": {
  "NODE_ENV": "production",
  "MONGODB_USERNAME": "terry07590759",
  "MONGODB_PASSWORD": "Na0E6iNR4p3gGNg1",
  "MONGODB_CLUSTER": "cluster0.zqsy7.mongodb.net",
  "MONGODB_DATABASE": "Leshan20250911",
  "MONGODB_COLLECTION": "price_template"
}
```

#### ✅ 路由配置
```json
"routes": [
  {
    "path": "/*",
    "method": "ANY",
    "target": "edge-function",
    "function": "leshan-furniture-system"
  }
]
```

#### ✅ 缓存和安全配置
```json
"caching": {
  "static": { "maxAge": 3600 },
  "api": { "maxAge": 300 }
},
"security": {
  "cors": {
    "origin": "*",
    "methods": ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    "headers": ["Content-Type", "Authorization"]
  }
}
```

### 2. `index.js` 优化内容：

#### ✅ 增强调试信息
- 添加了详细的请求日志
- 改进了错误处理
- 优化了404响应

#### ✅ 支持的路径
- `/` - 首页
- `/health` - 健康检查
- `/api/prices` - 价格数据API

## 🚀 EdgeOne控制台配置步骤

### 第一步：重新部署函数

1. **在EdgeOne控制台**：
   - 找到您的函数 `leshan-furniture-system`
   - 点击"重新部署"或"更新代码"

2. **配置入口文件**：
   ```
   入口文件: index.js
   处理函数: handler
   运行时: Node.js 18.x
   ```

### 第二步：配置环境变量

在EdgeOne控制台的环境变量部分添加：

```
NODE_ENV=production
MONGODB_USERNAME=terry07590759
MONGODB_PASSWORD=Na0E6iNR4p3gGNg1
MONGODB_CLUSTER=cluster0.zqsy7.mongodb.net
MONGODB_DATABASE=Leshan20250911
MONGODB_COLLECTION=price_template
```

### 第三步：配置路由规则

1. **进入路由配置**：
   - 找到"路由管理"或"Routing"
   - 点击"添加路由规则"

2. **设置路由规则**：
   ```
   路径: /*
   方法: ANY
   目标: 边缘函数
   函数: leshan-furniture-system
   ```

### 第四步：测试访问

1. **测试首页**：
   ```
   https://leshan916-2zukmkjd.zh-cn.edgeone.run/
   ```

2. **测试健康检查**：
   ```
   https://leshan916-2zukmkjd.zh-cn.edgeone.run/health
   ```

3. **测试API**：
   ```
   https://leshan916-2zukmkjd.zh-cn.edgeone.run/api/prices
   ```

## 🔍 调试方法

### 查看函数日志
1. 在EdgeOne控制台找到函数详情
2. 点击"日志"或"Logs"
3. 查看函数执行日志

### 常见问题排查

1. **如果还是404**：
   - 检查路由配置是否正确
   - 确认函数已部署
   - 查看函数日志

2. **如果函数执行错误**：
   - 检查环境变量是否正确
   - 查看MongoDB连接
   - 检查函数日志

3. **如果MongoDB连接失败**：
   - 确认环境变量已设置
   - 检查MongoDB网络访问
   - 查看连接日志

## ✅ 配置检查清单

- [ ] 函数已重新部署
- [ ] 环境变量已配置
- [ ] 路由规则已设置
- [ ] 函数日志正常
- [ ] 首页可以访问
- [ ] API可以调用

完成以上配置后，您的EdgeOne函数应该能正常工作了！
