// Vercel Serverless Function
const express = require('express');
const { MongoClient } = require('mongodb');
const cors = require('cors');
const path = require('path');

const app = express();

// 中间件
app.use(cors());
app.use(express.json());

// 静态文件服务
app.use(express.static(path.join(__dirname, '../public')));

// MongoDB连接配置
const mongoConfig = {
  username: process.env.MONGODB_USERNAME || 'terry07590759',
  password: process.env.MONGODB_PASSWORD || 'Na0E6iNR4p3gGNg1',
  cluster: process.env.MONGODB_CLUSTER || 'cluster0.zqsy7.mongodb.net',
  defaultDbName: process.env.MONGODB_DATABASE || 'Leshan20250911',
  priceCollectionName: process.env.MONGODB_COLLECTION || 'price_template'
};

const uri = `mongodb+srv://${mongoConfig.username}:${mongoConfig.password}@${mongoConfig.cluster}/`;

// 首页路由
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../public', 'index.html'));
});

// 健康检查接口
app.get('/api/health', (req, res) => {
  res.json({
    status: 'healthy',
    timestamp: new Date().toISOString(),
    version: '1.0.0'
  });
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

// 处理所有其他路由，返回首页
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../public', 'index.html'));
});

// 导出Express应用
module.exports = app;