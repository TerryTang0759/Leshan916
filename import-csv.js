// CSV文件导入MongoDB脚本
const { MongoClient } = require('mongodb');
const fs = require('fs');
const path = require('path');
const config = require('./config');

// MongoDB连接配置
const mongoConfig = config.mongodb;
const uri = `mongodb+srv://${mongoConfig.username}:${mongoConfig.password}@${mongoConfig.cluster}/`;

// CSV解析函数
function parseCSV(csvContent) {
  const lines = csvContent.trim().split('\n');
  const headers = lines[0].split(',');
  const data = [];
  
  for (let i = 1; i < lines.length; i++) {
    const values = lines[i].split(',');
    const obj = {};
    
    headers.forEach((header, index) => {
      const value = values[index]?.trim();
      
      // 特殊字段处理
      if (header === 'price') {
        obj[header] = parseFloat(value) || 0;
      } else {
        obj[header] = value || '';
      }
    });
    
    data.push(obj);
  }
  
  return data;
}

// 高级CSV解析函数（处理包含逗号的字段）
function parseCSVAdvanced(csvContent) {
  const lines = csvContent.trim().split('\n');
  const data = [];
  
  // 解析表头
  const headers = parseCSVLine(lines[0]);
  
  // 解析数据行
  for (let i = 1; i < lines.length; i++) {
    const values = parseCSVLine(lines[i]);
    const obj = {};
    
    headers.forEach((header, index) => {
      const value = values[index]?.trim() || '';
      
      // 特殊字段处理
      if (header === 'price') {
        obj[header] = parseFloat(value) || 0;
      } else {
        obj[header] = value;
      }
    });
    
    data.push(obj);
  }
  
  return data;
}

// 解析CSV行（处理引号包围的字段）
function parseCSVLine(line) {
  const result = [];
  let current = '';
  let inQuotes = false;
  
  for (let i = 0; i < line.length; i++) {
    const char = line[i];
    
    if (char === '"') {
      inQuotes = !inQuotes;
    } else if (char === ',' && !inQuotes) {
      result.push(current);
      current = '';
    } else {
      current += char;
    }
  }
  
  result.push(current);
  return result;
}

// 主导入函数
async function importCSV(csvFilePath) {
  const client = new MongoClient(uri);
  
  try {
    console.log('🔗 连接到MongoDB Atlas...');
    await client.connect();
    console.log('✅ MongoDB连接成功！');
    
    const db = client.db(mongoConfig.defaultDbName);
    const collection = db.collection(mongoConfig.priceCollectionName);
    
    // 读取CSV文件
    if (!fs.existsSync(csvFilePath)) {
      throw new Error(`CSV文件不存在: ${csvFilePath}`);
    }
    
    const csvContent = fs.readFileSync(csvFilePath, 'utf8');
    console.log('📄 CSV文件读取成功');
    
    // 解析CSV数据
    const csvData = parseCSVAdvanced(csvContent);
    console.log(`📊 解析到 ${csvData.length} 条数据`);
    
    if (csvData.length === 0) {
      console.log('⚠️  没有数据需要导入');
      return;
    }
    
    // 显示前3条数据作为预览
    console.log('\n📋 数据预览（前3条）:');
    csvData.slice(0, 3).forEach((item, index) => {
      console.log(`${index + 1}. ${item.category} - ${item.name} - ¥${item.price}${item.unit}`);
    });
    
    // 询问用户确认
    const readline = require('readline');
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    });
    
    const answer = await new Promise((resolve) => {
      rl.question('\n❓ 是否继续导入这些数据？(y/N): ', (answer) => {
        rl.close();
        resolve(answer.toLowerCase());
      });
    });
    
    if (answer !== 'y' && answer !== 'yes') {
      console.log('❌ 用户取消导入');
      return;
    }
    
    // 清空现有数据
    const existingCount = await collection.countDocuments();
    if (existingCount > 0) {
      await collection.deleteMany({});
      console.log(`🗑️  清空了 ${existingCount} 条旧数据`);
    }
    
    // 为数据添加时间戳
    const dataWithTimestamp = csvData.map(item => ({
      ...item,
      _importedAt: new Date(),
      _lastUpdated: new Date(),
      _source: 'csv_import'
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
    
    console.log('\n📈 导入数据统计:');
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

// 命令行使用
if (require.main === module) {
  console.log('📊 乐山家具定制系统 - CSV数据导入工具');
  console.log('================================================\n');
  
  // 获取CSV文件路径参数
  const csvFile = process.argv[2];
  
  if (!csvFile) {
    console.log('使用方法:');
    console.log('  node import-csv.js <csv文件路径>');
    console.log('');
    console.log('示例:');
    console.log('  node import-csv.js price_template.csv');
    console.log('  node import-csv.js ./data/prices.csv');
    console.log('  node import-csv.js /path/to/your/prices.csv');
    process.exit(1);
  }
  
  // 解析文件路径
  const csvFilePath = path.resolve(csvFile);
  console.log(`📁 CSV文件路径: ${csvFilePath}`);
  
  importCSV(csvFilePath)
    .then(() => {
      console.log('\n✨ CSV数据导入完成！');
      console.log('现在可以启动服务器: npm start');
      process.exit(0);
    })
    .catch(error => {
      console.error('💥 导入过程出错:', error);
      process.exit(1);
    });
}

module.exports = { importCSV, parseCSV, parseCSVAdvanced };
