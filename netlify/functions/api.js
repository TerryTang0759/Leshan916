// Netlify Function for API
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

exports.handler = async (event, context) => {
  // 设置CORS头
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
  };

  // 处理预检请求
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers,
      body: '',
    };
  }

  const { path, httpMethod, queryStringParameters } = event;

  try {
    if (path === '/api/health') {
      return {
        statusCode: 200,
        headers: {
          ...headers,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          status: 'healthy',
          timestamp: new Date().toISOString(),
          version: '1.0.0'
        }),
      };
    }

    if (path === '/api/prices' && httpMethod === 'GET') {
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
          headers: {
            ...headers,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            success: true,
            data: prices,
            count: prices.length
          }),
        };
        
      } finally {
        await client.close();
      }
    }

    // 默认返回404
    return {
      statusCode: 404,
      headers,
      body: JSON.stringify({ error: 'Not found' }),
    };

  } catch (error) {
    console.error('API错误:', error);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ error: 'Internal server error' }),
    };
  }
};
