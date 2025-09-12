// Vercel API函数 - 首页
const fs = require('fs');
const path = require('path');

module.exports = (req, res) => {
  try {
    // 读取index.html文件
    const indexPath = path.join(__dirname, '../public/index.html');
    const html = fs.readFileSync(indexPath, 'utf8');
    
    // 设置正确的Content-Type
    res.setHeader('Content-Type', 'text/html; charset=utf-8');
    res.status(200).send(html);
  } catch (error) {
    console.error('读取首页文件失败:', error);
    res.status(500).send('服务器内部错误');
  }
};
