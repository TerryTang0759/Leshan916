// EdgeOne Pages Node Function - MongoDB连接测试API
const { MongoClient } = require('mongodb');

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
  console.log('MongoDB连接测试开始');
  console.log('Context:', JSON.stringify(context, null, 2));
  
  const testResults = {
    timestamp: new Date().toISOString(),
    tests: [],
    success: false,
    error: null
  };
  
  try {
    const { request, clientIp, geo } = context;
    
    // 测试1: 基本连接
    testResults.tests.push({
      name: '基本连接测试',
      status: 'running'
    });
    
    const client = new MongoClient(uri);
    
    try {
      await client.connect();
      testResults.tests[0].status = 'success';
      testResults.tests[0].message = 'MongoDB连接成功';
      console.log('✅ MongoDB连接成功');
      
      // 测试2: 数据库访问
      testResults.tests.push({
        name: '数据库访问测试',
        status: 'running'
      });
      
      const db = client.db(mongoConfig.defaultDbName);
      const collections = await db.listCollections().toArray();
      testResults.tests[1].status = 'success';
      testResults.tests[1].message = `找到 ${collections.length} 个集合`;
      testResults.tests[1].collections = collections.map(c => c.name);
      console.log('✅ 数据库访问成功，集合:', collections.map(c => c.name));
      
      // 测试3: 集合访问
      testResults.tests.push({
        name: '集合访问测试',
        status: 'running'
      });
      
      const collection = db.collection(mongoConfig.priceCollectionName);
      const count = await collection.countDocuments();
      testResults.tests[2].status = 'success';
      testResults.tests[2].message = `集合 ${mongoConfig.priceCollectionName} 包含 ${count} 条记录`;
      testResults.tests[2].count = count;
      console.log('✅ 集合访问成功，记录数:', count);
      
      // 测试4: 数据查询
      testResults.tests.push({
        name: '数据查询测试',
        status: 'running'
      });
      
      const sampleData = await collection.find().limit(3).toArray();
      testResults.tests[3].status = 'success';
      testResults.tests[3].message = `成功查询到 ${sampleData.length} 条样本数据`;
      testResults.tests[3].sampleData = sampleData;
      console.log('✅ 数据查询成功，样本数据:', sampleData);
      
      testResults.success = true;
      testResults.message = '所有测试通过！MongoDB连接正常';
      
    } catch (dbError) {
      console.error('❌ 数据库操作错误:', dbError);
      testResults.tests.push({
        name: '数据库操作错误',
        status: 'error',
        message: dbError.message,
        stack: dbError.stack
      });
      testResults.error = dbError.message;
    } finally {
      await client.close();
      console.log('MongoDB连接已关闭');
    }
    
  } catch (error) {
    console.error('❌ 测试执行错误:', error);
    testResults.tests.push({
      name: '测试执行错误',
      status: 'error',
      message: error.message,
      stack: error.stack
    });
    testResults.error = error.message;
  }
  
  // 添加环境信息
  testResults.environment = {
    nodeVersion: process.version,
    platform: process.platform,
    mongoConfig: {
      cluster: mongoConfig.cluster,
      database: mongoConfig.defaultDbName,
      collection: mongoConfig.priceCollectionName
    }
  };
  
  return new Response(JSON.stringify(testResults, null, 2), {
    status: testResults.success ? 200 : 500,
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization'
    }
  });
}

export async function onRequestOptions(context) {
  return new Response(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization'
    }
  });
}
