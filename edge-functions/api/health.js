// EdgeOne Pages Edge Function - 健康检查API
export async function onRequestGet(context) {
  console.log('Edge Function被调用: /api/health');
  
  try {
    const { request } = context;
    const url = new URL(request.url);
    
    return new Response(JSON.stringify({
      status: 'ok',
      timestamp: new Date().toISOString(),
      service: 'leshan-furniture-system',
      platform: 'edgeone-pages',
      version: '1.0.0',
      uptime: process.uptime ? process.uptime() : 'unknown'
    }), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization'
      }
    });
    
  } catch (error) {
    console.error('健康检查错误:', error);
    return new Response(JSON.stringify({
      status: 'error',
      error: error.message,
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

export async function onRequestOptions(context) {
  // 处理CORS预检请求
  return new Response(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization'
    }
  });
}
