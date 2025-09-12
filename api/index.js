// Vercel API入口文件
const express = require('express');
const { MongoClient } = require('mongodb');
const cors = require('cors');
const path = require('path');
const config = require('../config');

const app = express();

// 中间件
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, '../public')));

// MongoDB连接配置
const mongoConfig = config.mongodb;
const uri = `mongodb+srv://${mongoConfig.username}:${mongoConfig.password}@${mongoConfig.cluster}/`;

// 首页路由 - 提供报价系统
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../public', 'index.html'));
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

// API路由 - 按类别获取价格数据
app.get('/api/prices/category/:category', async (req, res) => {
  const client = new MongoClient(uri);
  const { category } = req.params;
  
  try {
    await client.connect();
    const db = client.db(mongoConfig.defaultDbName);
    const collection = db.collection(mongoConfig.priceCollectionName);
    
    const prices = await collection.find({ category }).sort({ price: 1 }).toArray();
    
    res.json({
      success: true,
      data: prices,
      count: prices.length,
      category
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
  const { q: searchTerm } = req.query;
  
  if (!searchTerm) {
    return res.status(400).json({
      success: false,
      error: '搜索关键词不能为空'
    });
  }
  
  try {
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
      data: prices,
      count: prices.length,
      searchTerm
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

// API路由 - 获取所有类别
app.get('/api/prices/categories', async (req, res) => {
  const client = new MongoClient(uri);
  
  try {
    await client.connect();
    const db = client.db(mongoConfig.defaultDbName);
    const collection = db.collection(mongoConfig.priceCollectionName);
    
    const categories = await collection.distinct('category');
    
    res.json({
      success: true,
      data: categories,
      count: categories.length
    });
    
  } catch (error) {
    console.error('获取类别列表失败:', error);
    res.status(500).json({
      success: false,
      error: '获取类别列表失败'
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

// 处理所有其他路由，返回首页
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../public', 'index.html'));
});

module.exports = app;