// 乐山家具定制系统 - EdgeOne边缘函数 (简化版)
const { MongoClient } = require('mongodb');

// MongoDB连接配置
const mongoConfig = {
  username: process.env.MONGODB_USERNAME || 'terry07590759',
  password: process.env.MONGODB_PASSWORD || 'Na0E6iNR4p3gGNg1',
  cluster: process.env.MONGODB_CLUSTER || 'cluster0.zqsy7.mongodb.net',
  defaultDbName: process.env.MONGODB_DATABASE || 'Leshan20250911',
  priceCollectionName: process.env.MONGODB_COLLECTION || 'price_template'
};

const uri = `mongodb+srv://${mongoConfig.username}:${mongoConfig.password}@${mongoConfig.cluster}/`;

// 简化的HTML页面
const getHTML = () => `
<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>乐山家具定制报价系统</title>
    <style>
        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            margin: 0;
            padding: 20px;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            min-height: 100vh;
        }
        .container {
            max-width: 1200px;
            margin: 0 auto;
            background: white;
            border-radius: 10px;
            box-shadow: 0 10px 30px rgba(0,0,0,0.1);
            overflow: hidden;
        }
        .header {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            padding: 30px;
            text-align: center;
        }
        .header h1 {
            margin: 0;
            font-size: 2.5em;
            font-weight: 300;
        }
        .content {
            padding: 40px;
        }
        .status {
            background: #f8f9fa;
            border: 1px solid #e9ecef;
            border-radius: 8px;
            padding: 20px;
            margin: 20px 0;
        }
        .success {
            background: #d4edda;
            border-color: #c3e6cb;
            color: #155724;
        }
        .error {
            background: #f8d7da;
            border-color: #f5c6cb;
            color: #721c24;
        }
        .api-test {
            margin: 20px 0;
            padding: 20px;
            background: #f8f9fa;
            border-radius: 8px;
        }
        .btn {
            background: #667eea;
            color: white;
            border: none;
            padding: 12px 24px;
            border-radius: 6px;
            cursor: pointer;
            font-size: 16px;
            margin: 10px 5px;
        }
        .btn:hover {
            background: #5a6fd8;
        }
        .result {
            margin-top: 15px;
            padding: 15px;
            background: white;
            border-radius: 6px;
            border: 1px solid #ddd;
            white-space: pre-wrap;
            font-family: monospace;
            max-height: 300px;
            overflow-y: auto;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>🏠 乐山家具定制报价系统</h1>
            <p>EdgeOne边缘函数版本</p>
        </div>
        <div class="content">
            <div class="status success">
                <h3>✅ 系统状态</h3>
                <p>EdgeOne边缘函数已成功部署并运行！</p>
                <p>当前时间: <span id="currentTime"></span></p>
            </div>
            
            <div class="api-test">
                <h3>🔌 API测试</h3>
                <p>点击下方按钮测试MongoDB连接和API功能：</p>
                <button class="btn" onclick="testAPI('/api/prices')">测试获取所有价格</button>
                <button class="btn" onclick="testAPI('/api/prices?category=cabinet')">测试获取柜体价格</button>
                <button class="btn" onclick="testAPI('/health')">测试健康检查</button>
                <div id="apiResult" class="result" style="display: none;"></div>
            </div>
            
            <div class="status">
                <h3>📋 系统信息</h3>
                <p><strong>部署平台:</strong> 腾讯云EdgeOne</p>
                <p><strong>运行时:</strong> Node.js 18.x</p>
                <p><strong>数据库:</strong> MongoDB Atlas</p>
                <p><strong>功能:</strong> 家具定制报价系统</p>
            </div>
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
            const resultDiv = document.getElementById('apiResult');
            resultDiv.style.display = 'block';
            resultDiv.textContent = '正在测试 ' + endpoint + '...';
            
            try {
                const response = await fetch(endpoint);
                const data = await response.json();
                
                resultDiv.textContent = JSON.stringify(data, null, 2);
                resultDiv.style.background = response.ok ? '#d4edda' : '#f8d7da';
            } catch (error) {
                resultDiv.textContent = '错误: ' + error.message;
                resultDiv.style.background = '#f8d7da';
            }
        }
    </script>
</body>
</html>
`;

// EdgeOne主处理函数
exports.handler = async (event, context) => {
    console.log('EdgeOne函数被调用:', JSON.stringify(event, null, 2));
    
    try {
        const { httpMethod, path, queryStringParameters } = event;
        
        // 设置CORS头
        const headers = {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
            'Access-Control-Allow-Headers': 'Content-Type, Authorization'
        };
        
        // 处理OPTIONS请求
        if (httpMethod === 'OPTIONS') {
            return {
                statusCode: 200,
                headers,
                body: JSON.stringify({ message: 'CORS preflight' })
            };
        }
        
        // 首页路由
        if (path === '/' || path === '') {
            return {
                statusCode: 200,
                headers: { 'Content-Type': 'text/html' },
                body: getHTML()
            };
        }
        
        // 健康检查
        if (path === '/health') {
            return {
                statusCode: 200,
                headers,
                body: JSON.stringify({
                    status: 'ok',
                    timestamp: new Date().toISOString(),
                    service: 'leshan-furniture-system',
                    platform: 'edgeone'
                })
            };
        }
        
        // API路由 - 获取价格数据
        if (path.startsWith('/api/prices')) {
            const client = new MongoClient(uri);
            
            try {
                await client.connect();
                const db = client.db(mongoConfig.defaultDbName);
                const collection = db.collection(mongoConfig.priceCollectionName);
                
                const category = queryStringParameters?.category;
                const query = category ? { category } : {};
                const prices = await collection.find(query).sort({ category: 1, price: 1 }).toArray();
                
                return {
                    statusCode: 200,
                    headers,
                    body: JSON.stringify({
                        success: true,
                        data: prices,
                        count: prices.length,
                        timestamp: new Date().toISOString()
                    })
                };
                
            } catch (error) {
                console.error('MongoDB错误:', error);
                return {
                    statusCode: 500,
                    headers,
                    body: JSON.stringify({
                        success: false,
                        error: '数据库连接失败',
                        message: error.message
                    })
                };
            } finally {
                await client.close();
            }
        }
        
        // 404处理
        return {
            statusCode: 404,
            headers,
            body: JSON.stringify({
                success: false,
                error: '接口不存在',
                path: path,
                method: httpMethod
            })
        };
        
    } catch (error) {
        console.error('函数执行错误:', error);
        return {
            statusCode: 500,
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            body: JSON.stringify({
                success: false,
                error: '服务器内部错误',
                message: error.message
            })
        };
    }
};
