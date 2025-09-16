# 🔧 MongoDB连接问题调试指南

## 🚨 问题诊断

如果MongoDB数据仍然无法导入，请按照以下步骤进行诊断：

### 📋 **第一步：使用诊断工具**

1. **访问诊断页面**：
   ```
   https://leshan9163-ek5ipabiwn.edgeone.run/mongodb-test.html
   ```

2. **运行完整测试**：
   - 点击"运行MongoDB连接测试"
   - 查看详细的测试结果
   - 记录任何错误信息

### 🔍 **第二步：检查常见问题**

#### 1. **Node Functions部署问题**
- ✅ 确认`node-functions`目录已部署
- ✅ 检查EdgeOne Pages控制台的函数日志
- ✅ 验证Node.js v20.x运行时

#### 2. **MongoDB连接问题**
- ✅ 检查MongoDB Atlas网络访问设置
- ✅ 确认IP白名单配置
- ✅ 验证数据库用户权限

#### 3. **环境变量问题**
- ✅ 确认MongoDB连接信息正确
- ✅ 检查EdgeOne Pages环境变量设置
- ✅ 验证数据库和集合名称

### 🧪 **第三步：逐步测试**

#### 测试1：基本连接
```
GET /api/test
```
**预期结果**：
```json
{
  "success": true,
  "tests": [
    {
      "name": "基本连接测试",
      "status": "success",
      "message": "MongoDB连接成功"
    }
  ]
}
```

#### 测试2：健康检查
```
GET /api/health
```
**预期结果**：
```json
{
  "status": "ok",
  "service": "leshan-furniture-system",
  "platform": "edgeone-pages-node-functions"
}
```

#### 测试3：价格数据API
```
GET /api/prices
```
**预期结果**：
```json
{
  "success": true,
  "data": [...],
  "count": 53
}
```

### 🔧 **第四步：问题排查**

#### 如果测试1失败（基本连接）：
1. **检查MongoDB Atlas设置**：
   - 登录MongoDB Atlas控制台
   - 检查网络访问设置
   - 确认IP白名单包含EdgeOne节点

2. **检查连接字符串**：
   ```javascript
   const uri = `mongodb+srv://terry07590759:Na0E6iNR4p3gGNg1@cluster0.zqsy7.mongodb.net/`;
   ```

3. **检查数据库用户**：
   - 确认用户`terry07590759`存在
   - 验证密码`Na0E6iNR4p3gGNg1`正确
   - 检查用户权限设置

#### 如果测试2失败（健康检查）：
1. **检查Node Functions部署**：
   - 在EdgeOne Pages控制台查看函数状态
   - 检查函数执行日志
   - 确认路由配置正确

2. **检查edgeone.json配置**：
   ```json
   {
     "functions": {
       "node-functions": {
         "runtime": "nodejs20"
       }
     }
   }
   ```

#### 如果测试3失败（价格数据）：
1. **检查数据库和集合**：
   - 确认数据库`Leshan20250911`存在
   - 确认集合`price_template`存在
   - 检查集合中是否有数据

2. **检查查询权限**：
   - 确认用户有读取权限
   - 检查集合访问权限

### 📊 **第五步：查看详细日志**

#### 在EdgeOne Pages控制台：
1. **进入项目详情**
2. **查看"日志分析"**
3. **检查Node Functions执行日志**
4. **查找MongoDB相关错误**

#### 在浏览器控制台：
1. **打开开发者工具**
2. **查看Network标签页**
3. **检查API请求状态**
4. **查看响应内容**

### 🛠️ **第六步：修复方案**

#### 方案1：修复MongoDB连接
```javascript
// 在node-functions/api/prices.js中添加更详细的错误处理
try {
  await client.connect();
  console.log('MongoDB连接成功');
} catch (error) {
  console.error('MongoDB连接失败:', error);
  return new Response(JSON.stringify({
    success: false,
    error: 'MongoDB连接失败',
    details: error.message
  }));
}
```

#### 方案2：修复环境变量
在EdgeOne Pages控制台确保以下环境变量已设置：
```
MONGODB_USERNAME=terry07590759
MONGODB_PASSWORD=Na0E6iNR4p3gGNg1
MONGODB_CLUSTER=cluster0.zqsy7.mongodb.net
MONGODB_DATABASE=Leshan20250911
MONGODB_COLLECTION=price_template
```

#### 方案3：修复网络访问
在MongoDB Atlas控制台：
1. **网络访问** → **IP访问列表**
2. **添加当前IP地址**
3. **或者添加0.0.0.0/0（允许所有IP，仅用于测试）**

### 📞 **需要帮助？**

如果按照以上步骤仍然无法解决问题，请提供：

1. **诊断工具的结果**：
   - 访问`/mongodb-test.html`的完整输出

2. **EdgeOne Pages日志**：
   - 函数执行日志的截图

3. **浏览器控制台错误**：
   - Network标签页的错误信息

4. **MongoDB Atlas状态**：
   - 数据库连接状态截图

我会根据这些信息提供针对性的解决方案！
