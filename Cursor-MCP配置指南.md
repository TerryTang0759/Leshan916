# 🚀 Cursor MCP 配置指南

## 📋 配置步骤

### 1. 获取EdgeOne Pages API Token

1. **登录EdgeOne Pages控制台**
   - 访问：https://edgeone.cloud.tencent.com/pages
   - 登录您的腾讯云账号

2. **进入API Token页面**
   - 点击左侧菜单"API Token"
   - 点击"创建Token"

3. **配置Token权限**
   - 选择"Pages"权限
   - 设置Token名称：`cursor-mcp-token`
   - 点击"创建"

4. **复制Token值**
   - 记录生成的Token值
   - 保存到安全位置

### 2. 配置Cursor MCP

#### 方法1：通过Cursor设置界面

1. **打开Cursor设置**
   - 按 `Cmd+,` (Mac) 或 `Ctrl+,` (Windows)
   - 搜索 "MCP" 或 "Model Context Protocol"

2. **添加MCP服务器**
   - 点击"Add MCP Server"
   - 选择"JSON Configuration"
   - 粘贴以下配置：

```json
{
  "mcpServers": {
    "edgeone-pages-mcp-server": {
      "command": "npx",
      "args": ["edgeone-pages-mcp"],
      "env": {
        "EDGEONE_PAGES_API_TOKEN": "YOUR_ACTUAL_TOKEN_HERE",
        "EDGEONE_PAGES_PROJECT_NAME": "leshan-furniture-system"
      }
    }
  }
}
```

3. **替换API Token**
   - 将 `YOUR_ACTUAL_TOKEN_HERE` 替换为您的实际Token
   - 保存配置

#### 方法2：直接编辑配置文件

1. **找到Cursor配置目录**
   - Mac: `~/Library/Application Support/Cursor/User/`
   - Windows: `%APPDATA%\Cursor\User\`

2. **编辑settings.json**
   - 添加MCP配置到settings.json文件中

### 3. 测试MCP功能

配置完成后，测试MCP是否正常工作：

1. **在Cursor中询问AI**：
   ```
   请帮我部署一个简单的HTML页面到EdgeOne Pages
   ```

2. **AI应该能够**：
   - 调用MCP服务
   - 生成部署链接
   - 提供访问URL

## 🔧 配置说明

### 环境变量

- `EDGEONE_PAGES_API_TOKEN`：**必填**，EdgeOne Pages API Token
- `EDGEONE_PAGES_PROJECT_NAME`：**可选**，项目名称（置空创建新项目）

### 支持的功能

- ✅ 部署HTML单文件
- ✅ 部署文件夹或ZIP包
- ✅ 更新现有项目
- ✅ 创建新项目

## 🚨 故障排除

### 常见问题

1. **MCP服务未启动**
   - 检查Cursor设置中的MCP配置
   - 确认API Token正确

2. **部署失败**
   - 检查网络连接
   - 验证API Token权限

3. **项目名称冲突**
   - 修改 `EDGEONE_PAGES_PROJECT_NAME` 值
   - 或置空创建新项目

### 调试步骤

1. **检查Cursor日志**
   - 查看Cursor开发者工具
   - 检查MCP相关错误

2. **测试API Token**
   - 使用curl测试API Token
   - 验证权限设置

## 📚 参考文档

- [EdgeOne Pages MCP文档](https://edgeone.cloud.tencent.com/pages/document/173172415568367616)
- [Cursor MCP配置指南](https://cursor.sh/docs/mcp)
- [EdgeOne Pages API文档](https://edgeone.cloud.tencent.com/pages/document/184787642236784640)

## 🎯 下一步

配置完成后，您就可以：
1. 通过AI快速部署网页内容
2. 管理EdgeOne Pages项目
3. 享受边缘计算的优势

开始使用MCP让AI帮您快速部署网页吧！🚀
