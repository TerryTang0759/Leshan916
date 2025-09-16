# 🚀 Cursor MCP 配置步骤

## ✅ API Token 已配置

您的EdgeOne Pages API Token已配置完成：
```
4n69v9+7gdqN3AYvt1duveXH/65TEz+uOU0rC79c/q4=
```

## 🔧 在Cursor中配置MCP

### 方法1：通过Cursor设置界面

1. **打开Cursor设置**
   - 按 `Cmd+,` (Mac) 或 `Ctrl+,` (Windows)
   - 搜索 "MCP" 或 "Model Context Protocol"

2. **添加MCP服务器**
   - 点击 "Add MCP Server"
   - 选择 "JSON Configuration"
   - 复制以下配置：

```json
{
  "mcpServers": {
    "edgeone-pages-mcp-server": {
      "command": "npx",
      "args": ["edgeone-pages-mcp"],
      "env": {
        "EDGEONE_PAGES_API_TOKEN": "4n69v9+7gdqN3AYvt1duveXH/65TEz+uOU0rC79c/q4=",
        "EDGEONE_PAGES_PROJECT_NAME": "leshan-furniture-system"
      }
    }
  }
}
```

3. **保存配置**
   - 点击 "Save" 保存配置
   - 重启Cursor使配置生效

### 方法2：直接编辑配置文件

1. **找到Cursor配置目录**
   - Mac: `~/Library/Application Support/Cursor/User/`
   - Windows: `%APPDATA%\Cursor\User\`

2. **编辑settings.json**
   - 在settings.json中添加MCP配置
   - 保存文件

## 🧪 测试MCP功能

配置完成后，测试MCP是否正常工作：

### 测试1：部署测试页面
在Cursor中询问AI：
```
请帮我部署mcp-test.html文件到EdgeOne Pages
```

### 测试2：创建新页面
在Cursor中询问AI：
```
请帮我创建一个简单的HTML页面并部署到EdgeOne Pages
```

### 测试3：部署整个项目
在Cursor中询问AI：
```
请帮我部署整个项目文件夹到EdgeOne Pages
```

## 🎯 预期结果

如果配置成功，AI应该能够：
- ✅ 调用MCP服务
- ✅ 生成部署链接
- ✅ 提供访问URL
- ✅ 显示部署状态

## 🚨 故障排除

### 如果MCP不工作：

1. **检查Cursor设置**
   - 确认MCP配置已保存
   - 重启Cursor

2. **检查网络连接**
   - 确保能访问EdgeOne Pages
   - 检查防火墙设置

3. **检查API Token**
   - 确认Token有效
   - 检查权限设置

4. **查看Cursor日志**
   - 打开Cursor开发者工具
   - 查看MCP相关错误

## 📚 使用示例

配置完成后，您可以通过以下方式使用MCP：

### 部署单个HTML文件
```
请帮我部署这个HTML文件到EdgeOne Pages
```

### 部署项目文件夹
```
请帮我部署整个项目到EdgeOne Pages
```

### 更新现有项目
```
请帮我更新leshan-furniture-system项目
```

## 🎉 开始使用

现在您可以：
1. 通过AI快速部署网页内容
2. 管理EdgeOne Pages项目
3. 享受边缘计算的优势

开始使用MCP让AI帮您快速部署网页吧！🚀
