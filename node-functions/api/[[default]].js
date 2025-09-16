// EdgeOne Pages Node Function - 默认API处理
export async function onRequest(context) {
  console.log('Node Function被调用: 默认API处理');
  
  try {
    const { request, clientIp, geo } = context;
    const url = new URL(request.url);
    const path = url.pathname;
    
    console.log('请求路径:', path);
    console.log('客户端信息:', { clientIp, geo });
    
    return new Response(JSON.stringify({
      success: false,
      error: 'API接口不存在',
      path: path,
      method: request.method,
      timestamp: new Date().toISOString(),
      availableEndpoints: [
        '/api/prices',
        '/api/health'
      ],
      clientInfo: {
        ip: clientIp,
        geo: geo
      }
    }), {
      status: 404,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization'
      }
    });
    
  } catch (error) {
    console.error('默认API处理错误:', error);
    return new Response(JSON.stringify({
      success: false,
      error: '服务器内部错误',
      message: error.message,
      timestamp: new Date().toISOString()
    }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      }
    });
  }
}
