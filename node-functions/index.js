// EdgeOne Pages Node Function - 主入口
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

// 主处理函数
async function onRequest(request) {
  const url = new URL(request.url);
  const pathname = url.pathname;
  
  console.log(`EdgeOne Function: ${request.method} ${pathname}`);
  
  // 设置CORS头
  const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    'Content-Type': 'application/json'
  };
  
  // 处理OPTIONS请求
  if (request.method === 'OPTIONS') {
    return new Response(null, {
      status: 200,
      headers: corsHeaders
    });
  }
  
  // 首页 - 返回HTML
  if (pathname === '/' && request.method === 'GET') {
    try {
      const fs = require('fs');
      const path = require('path');
      const htmlPath = path.join(__dirname, '../public/index.html');
      const htmlContent = fs.readFileSync(htmlPath, 'utf8');
      
      return new Response(htmlContent, {
        status: 200,
        headers: {
          'Content-Type': 'text/html; charset=utf-8',
          ...corsHeaders
        }
      });
    } catch (error) {
      console.error('读取HTML文件失败:', error);
      return new Response('页面加载失败', {
        status: 500,
        headers: corsHeaders
      });
    }
  }
  
  // API路由 - 获取价格数据
  if (pathname === '/api/prices' && request.method === 'GET') {
    const client = new MongoClient(uri);
    
    try {
      await client.connect();
      const db = client.db(mongoConfig.defaultDbName);
      const collection = db.collection(mongoConfig.priceCollectionName);
      
      const category = url.searchParams.get('category');
      const query = category ? { category } : {};
      
      const prices = await collection.find(query).sort({ category: 1, price: 1 }).toArray();
      
      return new Response(JSON.stringify({
        success: true,
        data: prices,
        count: prices.length
      }), {
        status: 200,
        headers: corsHeaders
      });
      
    } catch (error) {
      console.error('获取价格数据失败:', error);
      return new Response(JSON.stringify({
        success: false,
        error: '获取价格数据失败'
      }), {
        status: 500,
        headers: corsHeaders
      });
    } finally {
      await client.close();
    }
  }
  
  // 健康检查
  if (pathname === '/api/health' && request.method === 'GET') {
    return new Response(JSON.stringify({
      status: 'healthy',
      timestamp: new Date().toISOString(),
      version: '1.0.0',
      platform: 'EdgeOne Pages'
    }), {
      status: 200,
      headers: corsHeaders
    });
  }
  
  // 404处理
  return new Response(JSON.stringify({
    success: false,
    error: '页面未找到',
    availablePaths: ['/', '/api/prices', '/api/health']
  }), {
    status: 404,
    headers: corsHeaders
  });
}

// 导出处理函数
module.exports = { onRequest };
