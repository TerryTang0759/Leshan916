// EdgeOne 测试函数 - 最简单的版本
exports.handler = async (event, context) => {
    console.log('EdgeOne函数被调用:', JSON.stringify(event, null, 2));
    
    try {
        const { httpMethod, path, queryStringParameters } = event;
        
        // 设置响应头
        const headers = {
            'Content-Type': 'text/html; charset=utf-8',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
            'Access-Control-Allow-Headers': 'Content-Type, Authorization'
        };
        
        // 处理OPTIONS请求
        if (httpMethod === 'OPTIONS') {
            return {
                statusCode: 200,
                headers,
                body: 'OK'
            };
        }
        
        // 简单的HTML响应
        const html = `
<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>乐山家具定制系统 - EdgeOne测试</title>
    <style>
        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            margin: 0;
            padding: 20px;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            min-height: 100vh;
            display: flex;
            align-items: center;
            justify-content: center;
        }
        .container {
            background: white;
            border-radius: 10px;
            box-shadow: 0 10px 30px rgba(0,0,0,0.1);
            padding: 40px;
            text-align: center;
            max-width: 600px;
        }
        .success {
            color: #28a745;
            font-size: 3em;
            margin-bottom: 20px;
        }
        .title {
            color: #333;
            font-size: 2em;
            margin-bottom: 20px;
        }
        .info {
            color: #666;
            font-size: 1.1em;
            line-height: 1.6;
        }
        .details {
            background: #f8f9fa;
            border-radius: 8px;
            padding: 20px;
            margin: 20px 0;
            text-align: left;
        }
        .details h3 {
            margin-top: 0;
            color: #333;
        }
        .details p {
            margin: 10px 0;
            color: #666;
        }
        .test-btn {
            background: #667eea;
            color: white;
            border: none;
            padding: 12px 24px;
            border-radius: 6px;
            cursor: pointer;
            font-size: 16px;
            margin: 10px;
        }
        .test-btn:hover {
            background: #5a6fd8;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="success">✅</div>
        <h1 class="title">乐山家具定制系统</h1>
        <p class="info">EdgeOne边缘函数部署成功！</p>
        
        <div class="details">
            <h3>🎉 部署信息</h3>
            <p><strong>平台:</strong> 腾讯云EdgeOne</p>
            <p><strong>状态:</strong> 运行正常</p>
            <p><strong>时间:</strong> <span id="currentTime"></span></p>
            <p><strong>请求方法:</strong> ${httpMethod}</p>
            <p><strong>请求路径:</strong> ${path}</p>
            <p><strong>查询参数:</strong> ${JSON.stringify(queryStringParameters || {})}</p>
        </div>
        
        <div class="details">
            <h3>🔧 测试功能</h3>
            <button class="test-btn" onclick="testAPI('/api/test')">测试API</button>
            <button class="test-btn" onclick="testAPI('/health')">健康检查</button>
            <div id="testResult" style="margin-top: 20px; padding: 15px; background: #f8f9fa; border-radius: 6px; display: none;"></div>
        </div>
        
        <div class="details">
            <h3>📋 系统状态</h3>
            <p>✅ EdgeOne函数正常运行</p>
            <p>✅ 响应时间正常</p>
            <p>✅ 跨域请求支持</p>
            <p>⏳ MongoDB连接待测试</p>
        </div>
    </div>

    <script>
        // 显示当前时间
        function updateTime() {
            document.getElementById('currentTime').textContent = new Date().toLocaleString('zh-CN');
        }
        updateTime();
        setInterval(updateTime, 1000);

        // API测试函数
        async function testAPI(endpoint) {
            const resultDiv = document.getElementById('testResult');
            resultDiv.style.display = 'block';
            resultDiv.innerHTML = '正在测试 ' + endpoint + '...';
            
            try {
                const response = await fetch(endpoint);
                const data = await response.text();
                
                resultDiv.innerHTML = '<strong>响应状态:</strong> ' + response.status + '<br><strong>响应内容:</strong><br><pre>' + data + '</pre>';
                resultDiv.style.background = response.ok ? '#d4edda' : '#f8d7da';
            } catch (error) {
                resultDiv.innerHTML = '<strong>错误:</strong> ' + error.message;
                resultDiv.style.background = '#f8d7da';
            }
        }
    </script>
</body>
</html>
        `;
        
        return {
            statusCode: 200,
            headers,
            body: html
        };
        
    } catch (error) {
        console.error('函数执行错误:', error);
        return {
            statusCode: 500,
            headers: {
                'Content-Type': 'text/html; charset=utf-8',
                'Access-Control-Allow-Origin': '*'
            },
            body: `
<!DOCTYPE html>
<html>
<head>
    <title>错误</title>
    <meta charset="utf-8">
</head>
<body>
    <h1>服务器错误</h1>
    <p>错误信息: ${error.message}</p>
</body>
</html>
            `
        };
    }
};
