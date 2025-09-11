// 导入价格数据到MongoDB
const { MongoClient } = require('mongodb');
const fs = require('fs');
const path = require('path');
const config = require('./config');

// MongoDB连接配置
const mongoConfig = config.mongodb;
const uri = `mongodb+srv://${mongoConfig.username}:${mongoConfig.password}@${mongoConfig.cluster}/`;

async function importPrices() {
  const client = new MongoClient(uri);
  
  try {
    console.log('🔗 连接到MongoDB Atlas...');
    await client.connect();
    console.log('✅ MongoDB连接成功！');
    
    const db = client.db(mongoConfig.defaultDbName);
    const collection = db.collection(mongoConfig.priceCollectionName);
    
    // 读取价格数据
    const pricesPath = path.join(__dirname, 'sample-prices.json');
    const pricesData = JSON.parse(fs.readFileSync(pricesPath, 'utf8'));
    
    console.log(`📊 读取到 ${pricesData.length} 条价格数据`);
    
    // 清空现有数据
    const existingCount = await collection.countDocuments();
    if (existingCount > 0) {
      await collection.deleteMany({});
      console.log(`🗑️  清空了 ${existingCount} 条旧数据`);
    }
    
    // 为数据添加时间戳
    const dataWithTimestamp = pricesData.map(item => ({
      ...item,
      _importedAt: new Date(),
      _lastUpdated: new Date()
    }));
    
    // 批量插入数据
    const result = await collection.insertMany(dataWithTimestamp);
    console.log(`🎉 成功导入 ${result.insertedCount} 条价格数据！`);
    
    // 创建索引
    await collection.createIndex({ category: 1 });
    await collection.createIndex({ id: 1 }, { unique: true });
    await collection.createIndex({ name: 1 });
    console.log('🔍 索引创建完成');
    
    // 统计各类别数据
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
    
    console.log('\n📈 价格数据统计:');
    categories.forEach(cat => {
      console.log(`  ${cat._id}: ${cat.count}条, 均价¥${cat.avgPrice.toFixed(0)}, 区间¥${cat.minPrice}-¥${cat.maxPrice}`);
    });
    
  } catch (error) {
    console.error('❌ 导入失败:', error.message);
    process.exit(1);
  } finally {
    await client.close();
    console.log('\n🔌 MongoDB连接已关闭');
  }
}

// 运行导入
if (require.main === module) {
  console.log('🏠 乐山家具定制系统 - 价格数据导入工具');
  console.log('================================================\n');
  
  importPrices()
    .then(() => {
      console.log('\n✨ 价格数据导入完成！');
      console.log('现在可以启动服务器: npm start');
      process.exit(0);
    })
    .catch(error => {
      console.error('💥 导入过程出错:', error);
      process.exit(1);
    });
}

module.exports = { importPrices };
