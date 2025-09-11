// 乐山家具定制系统 - 后端服务器
const express = require('express');
const { MongoClient } = require('mongodb');
const cors = require('cors');
const path = require('path');
const config = require('./config');

const app = express();
const PORT = config.server.port;

// 中间件
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// MongoDB连接配置
const mongoConfig = config.mongodb;
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

// API路由 - 根据类别获取价格数据
app.get('/api/prices/category/:category', async (req, res) => {
  const client = new MongoClient(uri);
  
  try {
    const category = req.params.category;
    await client.connect();
    const db = client.db(mongoConfig.defaultDbName);
    const collection = db.collection(mongoConfig.priceCollectionName);
    
    const prices = await collection.find({ category }).sort({ price: 1 }).toArray();
    
    res.json({
      success: true,
      category,
      data: prices,
      count: prices.length
    });
    
  } catch (error) {
    console.error('获取分类价格数据失败:', error);
    res.status(500).json({
      success: false,
      error: '获取分类价格数据失败'
    });
  } finally {
    await client.close();
  }
});

// API路由 - 搜索价格数据
app.get('/api/prices/search', async (req, res) => {
  const client = new MongoClient(uri);
  
  try {
    const searchTerm = req.query.q;
    if (!searchTerm) {
      return res.status(400).json({
        success: false,
        error: '缺少搜索关键词'
      });
    }
    
    await client.connect();
    const db = client.db(mongoConfig.defaultDbName);
    const collection = db.collection(mongoConfig.priceCollectionName);
    
    const searchRegex = new RegExp(searchTerm, 'i');
    const prices = await collection.find({
      $or: [
        { name: searchRegex },
        { brand: searchRegex }
      ]
    }).sort({ category: 1, price: 1 }).toArray();
    
    res.json({
      success: true,
      searchTerm,
      data: prices,
      count: prices.length
    });
    
  } catch (error) {
    console.error('搜索价格数据失败:', error);
    res.status(500).json({
      success: false,
      error: '搜索价格数据失败'
    });
  } finally {
    await client.close();
  }
});

// API路由 - 获取价格类别统计
app.get('/api/prices/categories', async (req, res) => {
  const client = new MongoClient(uri);
  
  try {
    await client.connect();
    const db = client.db(mongoConfig.defaultDbName);
    const collection = db.collection(mongoConfig.priceCollectionName);
    
    const categories = await collection.aggregate([
      {
        $group: {
          _id: '$category',
          count: { $sum: 1 },
          avgPrice: { $avg: '$price' },
          minPrice: { $min: '$price' },
          maxPrice: { $max: '$price' }
        }
      },
      { $sort: { _id: 1 } }
    ]).toArray();
    
    res.json({
      success: true,
      data: categories
    });
    
  } catch (error) {
    console.error('获取类别统计失败:', error);
    res.status(500).json({
      success: false,
      error: '获取类别统计失败'
    });
  } finally {
    await client.close();
  }
});

// 健康检查接口
app.get('/api/health', (req, res) => {
  res.json({
    status: 'healthy',
    timestamp: new Date().toISOString(),
    version: '1.0.0'
  });
});

// 启动服务器（仅在直接运行时启动，Vercel会自动处理）
if (require.main === module) {
  app.listen(PORT, config.server.host, () => {
    console.log('🏠 乐山家具定制系统 - 整合版');
    console.log('================================');
    console.log(`🚀 服务器已启动: http://${config.server.host}:${PORT}`);
    console.log(`📱 报价系统: http://${config.server.host}:${PORT}/`);
    console.log(`🔌 API接口: http://${config.server.host}:${PORT}/api/prices`);
    console.log('================================');
  });
}

// 导出app供Vercel使用
module.exports = app;
