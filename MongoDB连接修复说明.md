# 🔧 MongoDB连接修复说明

## 🔍 问题分析

从您的截图可以看到系统已经运行，但显示"使用备用数据"按钮，说明MongoDB连接有问题。

### 问题根源：
1. **EdgeOne Pages路由配置问题**：API请求被重定向到静态文件
2. **环境变量传递问题**：MongoDB连接信息可能没有正确传递
3. **Edge Function配置问题**：API路由没有正确指向Edge Function

## 🔧 修复方案

### 1. 修复EdgeOne Pages配置

#### 问题：重定向规则拦截API请求
```json
// 错误的配置
"redirects": [
  {
    "source": "/*",
    "destination": "/index.html"  // 这会拦截所有请求，包括API
  }
]
```

#### 解决方案：正确的路由配置
```json
"routes": [
  {
    "path": "/api/*",
    "function": "index.js"  // API请求指向Edge Function
  }
]
```

### 2. 环境变量配置

在EdgeOne Pages控制台确保以下环境变量已设置：

```
NODE_ENV=production
MONGODB_USERNAME=terry07590759
MONGODB_PASSWORD=Na0E6iNR4p3gGNg1
MONGODB_CLUSTER=cluster0.zqsy7.mongodb.net
MONGODB_DATABASE=Leshan20250911
MONGODB_COLLECTION=price_template
```

### 3. Edge Function配置

确保Edge Function正确配置：
- **入口文件**：`index.js`
- **处理函数**：`handler`
- **运行时**：Node.js 18.x
- **路由**：`/api/*` → Edge Function

## 🧪 测试步骤

### 1. 使用测试页面
访问：`https://leshan9163-ek5ipabiwn.edgeone.run/api-test.html`

这个测试页面会：
- 测试 `/api/prices` 端点
- 测试 `/health` 端点
- 直接测试MongoDB连接
- 显示详细的错误信息

### 2. 检查浏览器控制台
1. 打开浏览器开发者工具
2. 查看Console标签页
3. 查看Network标签页
4. 检查API请求的状态和响应

### 3. 检查EdgeOne Pages日志
1. 在EdgeOne Pages控制台
2. 查看函数执行日志
3. 检查是否有MongoDB连接错误

## 🔧 具体修复步骤

### 步骤1：更新EdgeOne Pages配置

1. **在EdgeOne Pages控制台**：
   - 进入项目设置
   - 更新构建配置
   - 使用 `edgeone-pages-config.json` 的配置

2. **配置路由规则**：
   ```
   /api/* → Edge Function (index.js)
   /* → 静态文件 (index.html)
   ```

### 步骤2：配置环境变量

1. **在EdgeOne Pages控制台**：
   - 找到环境变量设置
   - 添加MongoDB连接信息
   - 确保变量名称正确

### 步骤3：重新部署

1. **触发重新部署**
2. **等待部署完成**
3. **测试API连接**

## 🎯 预期结果

修复后应该看到：
- ✅ "MongoDB实时数据驱动" 状态正常
- ✅ 不再显示"使用备用数据"按钮
- ✅ 材料数据从MongoDB加载
- ✅ API请求返回正确的数据

## 🔍 调试方法

### 如果仍然有问题：

1. **检查API测试页面**：
   - 访问 `/api-test.html`
   - 查看详细的错误信息

2. **检查浏览器网络请求**：
   - 打开开发者工具
   - 查看 `/api/prices` 请求的状态

3. **检查EdgeOne Pages日志**：
   - 查看函数执行日志
   - 确认MongoDB连接状态

## 📞 需要帮助？

如果修复后仍有问题，请提供：
1. API测试页面的结果
2. 浏览器控制台的错误信息
3. EdgeOne Pages的函数日志

我会根据具体错误信息提供进一步的解决方案！
