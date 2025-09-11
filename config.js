// MongoDB配置文件
// 支持环境变量和默认值

module.exports = {
  mongodb: {
    username: process.env.MONGODB_USERNAME || 'terry07590759',
    password: process.env.MONGODB_PASSWORD || 'Na0E6iNR4p3gGNg1', 
    cluster: process.env.MONGODB_CLUSTER || 'cluster0.zqsy7.mongodb.net',
    defaultDbName: process.env.MONGODB_DATABASE || 'Leshan20250911',
    priceCollectionName: process.env.MONGODB_COLLECTION || 'price_template'
  },
  server: {
    port: process.env.PORT || 3000,
    host: process.env.HOST || '0.0.0.0' // 云平台需要监听所有接口
  }
};
