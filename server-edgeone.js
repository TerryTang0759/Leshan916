// 乐山家具定制系统 - EdgeOne边缘函数
const express = require('express');
const { MongoClient } = require('mongodb');
const cors = require('cors');
const path = require('path');

const app = express();

// 中间件
app.use(cors());
app.use(express.json());

// 静态文件服务
app.use(express.static(path.join(__dirname, 'public')));

// MongoDB连接配置
const mongoConfig = {
  username: process.env.MONGODB_USERNAME || 'terry07590759',
  password: process.env.MONGODB_PASSWORD || 'Na0E6iNR4p3gGNg1',
  cluster: process.env.MONGODB_CLUSTER || 'cluster0.zqsy7.mongodb.net',
  defaultDbName: process.env.MONGODB_DATABASE || 'Leshan20250911',
  priceCollectionName: process.env.MONGODB_COLLECTION || 'price_template'
};

const uri = `mongodb+srv://${mongoConfig.username}:${mongoConfig.password}@${mongoConfig.cluster}/`;

// 首页路由 - 提供报价系统
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// API路由 - 获取所有价格数据
app.get('/api/prices', async (req, res) => {
  const client = new MongoClient(uri);
  
  try {
    await client.connect();
    const db = client.db(mongoConfig.defaultDbName);
    const collection = db.collection(mongoConfig.priceCollectionName);
    
    const category = req.query.category;
    const query = category ? { category } : {};
    
    const prices = await collection.find(query).sort({ category: 1, price: 1 }).toArray();
    
    res.json({
      success: true,
      data: prices,
      count: prices.length
    });
    
  } catch (error) {
    console.error('获取价格数据失败:', error);
    res.status(500).json({
      success: false,
      error: '获取价格数据失败'
    });
  } finally {
    await client.close();
  }
});

// 获取特定类别的价格数据
app.get('/api/prices/:category', async (req, res) => {
  const client = new MongoClient(uri);
  
  try {
    await client.connect();
    const db = client.db(mongoConfig.defaultDbName);
    const collection = db.collection(mongoConfig.priceCollectionName);
    
    const category = req.params.category;
    const prices = await collection.find({ category }).sort({ price: 1 }).toArray();
    
    res.json({
      success: true,
      data: prices,
      count: prices.length
    });
    
  } catch (error) {
    console.error('获取价格数据失败:', error);
    res.status(500).json({
      success: false,
      error: '获取价格数据失败'
    });
  } finally {
    await client.close();
  }
});

// 健康检查
app.get('/health', (req, res) => {
  res.json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    service: 'leshan-furniture-system'
  });
});

// 404处理
app.use('*', (req, res) => {
  res.status(404).json({
    success: false,
    error: '接口不存在',
    path: req.originalUrl
  });
});

// EdgeOne函数入口
exports.handler = async (event, context) => {
  // 将EdgeOne事件转换为Express请求
  const { httpMethod, path, headers, body, queryStringParameters } = event;
  
  // 创建模拟的Express请求对象
  const req = {
    method: httpMethod,
    url: path,
    headers: headers || {},
    body: body ? JSON.parse(body) : {},
    query: queryStringParameters || {}
  };
  
  // 创建模拟的Express响应对象
  const res = {
    statusCode: 200,
    headers: {},
    body: '',
    
    status: (code) => {
      res.statusCode = code;
      return res;
    },
    
    json: (data) => {
      res.body = JSON.stringify(data);
      res.headers['Content-Type'] = 'application/json';
      return res;
    },
    
    send: (data) => {
      res.body = data;
      return res;
    },
    
    sendFile: (filePath) => {
      // 对于静态文件，返回重定向到CDN
      res.statusCode = 302;
      res.headers['Location'] = `https://your-cdn-domain.com${path}`;
      return res;
    }
  };
  
  try {
    // 处理请求
    if (path === '/') {
      res.statusCode = 200;
      res.headers['Content-Type'] = 'text/html';
      res.body = `
        <!DOCTYPE html>
        <html>
        <head>
          <title>乐山家具定制报价系统</title>
          <meta charset="utf-8">
        </head>
        <body>
          <h1>乐山家具定制报价系统</h1>
          <p>系统正在维护中，请稍后再试。</p>
        </body>
        </html>
      `;
    } else if (path.startsWith('/api/')) {
      // API请求处理
      if (path === '/api/prices') {
        const client = new MongoClient(uri);
        try {
          await client.connect();
          const db = client.db(mongoConfig.defaultDbName);
          const collection = db.collection(mongoConfig.priceCollectionName);
          
          const category = queryStringParameters?.category;
          const query = category ? { category } : {};
          const prices = await collection.find(query).sort({ category: 1, price: 1 }).toArray();
          
          res.json({
            success: true,
            data: prices,
            count: prices.length
          });
        } catch (error) {
          console.error('获取价格数据失败:', error);
          res.status(500).json({
            success: false,
            error: '获取价格数据失败'
          });
        } finally {
          await client.close();
        }
      } else {
        res.status(404).json({
          success: false,
          error: '接口不存在'
        });
      }
    } else {
      res.status(404).json({
        success: false,
        error: '页面不存在'
      });
    }
    
    return {
      statusCode: res.statusCode,
      headers: res.headers,
      body: res.body
    };
    
  } catch (error) {
    console.error('处理请求失败:', error);
    return {
      statusCode: 500,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        success: false,
        error: '服务器内部错误'
      })
    };
  }
};

// 如果直接运行（本地测试）
if (require.main === module) {
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`🏠 乐山家具定制系统 - EdgeOne版本`);
    console.log(`🚀 服务器已启动: http://localhost:${PORT}`);
    console.log(`📱 报价系统: http://localhost:${PORT}/`);
    console.log(`🔌 API接口: http://localhost:${PORT}/api/prices`);
  });
}
