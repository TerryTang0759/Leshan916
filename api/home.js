// Vercel Function - 首页
const fs = require('fs');
const path = require('path');

module.exports = (req, res) => {
  try {
    // 设置正确的Content-Type
    res.setHeader('Content-Type', 'text/html; charset=utf-8');
    
    // 读取index.html文件
    const indexPath = path.join(__dirname, '../public/index.html');
    const html = fs.readFileSync(indexPath, 'utf8');
    
    res.status(200).send(html);
  } catch (error) {
    console.error('读取首页文件失败:', error);
    res.status(500).send(`
      <html>
        <head><title>错误</title></head>
        <body>
          <h1>服务器错误</h1>
          <p>无法加载页面，请稍后重试。</p>
          <p>错误信息: ${error.message}</p>
        </body>
      </html>
    `);
  }
};