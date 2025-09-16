// EdgeOne Pages Edge Function - MongoDB价格数据API
import { MongoClient } from 'mongodb';

// MongoDB连接配置
const mongoConfig = {
  username: 'terry07590759',
  password: 'Na0E6iNR4p3gGNg1',
  cluster: 'cluster0.zqsy7.mongodb.net',
  defaultDbName: 'Leshan20250911',
  priceCollectionName: 'price_template'
};

const uri = `mongodb+srv://${mongoConfig.username}:${mongoConfig.password}@${mongoConfig.cluster}/`;

export async function onRequestGet(context) {
  console.log('Edge Function被调用: /api/prices');
  
  try {
    const { request, env } = context;
    const url = new URL(request.url);
    const category = url.searchParams.get('category');
    
    console.log('请求参数:', { category });
    
    // 连接MongoDB
    const client = new MongoClient(uri);
    
    try {
      await client.connect();
      console.log('MongoDB连接成功');
      
      const db = client.db(mongoConfig.defaultDbName);
      const collection = db.collection(mongoConfig.priceCollectionName);
      
      // 构建查询条件
      const query = category ? { category } : {};
      console.log('查询条件:', query);
      
      // 获取数据
      const prices = await collection.find(query).sort({ category: 1, price: 1 }).toArray();
      console.log('查询结果数量:', prices.length);
      
      return new Response(JSON.stringify({
        success: true,
        data: prices,
        count: prices.length,
        timestamp: new Date().toISOString()
      }), {
        status: 200,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
          'Access-Control-Allow-Headers': 'Content-Type, Authorization'
        }
      });
      
    } catch (error) {
      console.error('MongoDB操作错误:', error);
      return new Response(JSON.stringify({
        success: false,
        error: '数据库连接失败',
        message: error.message,
        timestamp: new Date().toISOString()
      }), {
        status: 500,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*'
        }
      });
    } finally {
      await client.close();
      console.log('MongoDB连接已关闭');
    }
    
  } catch (error) {
    console.error('Edge Function执行错误:', error);
    return new Response(JSON.stringify({
      success: false,
      error: '服务器内部错误',
      message: error.message,
      timestamp: new Date().toISOString()
    }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      }
    });
  }
}

export async function onRequestOptions(context) {
  // 处理CORS预检请求
  return new Response(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization'
    }
  });
}
