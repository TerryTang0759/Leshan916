// EdgeOne Pages Node Function - 健康检查API
export async function onRequestGet(context) {
  console.log('Node Function被调用: /api/health');
  
  try {
    const { request, env, clientIp, geo, server } = context;
    
    return new Response(JSON.stringify({
      status: 'ok',
      timestamp: new Date().toISOString(),
      service: 'leshan-furniture-system',
      platform: 'edgeone-pages-node-functions',
      version: '1.0.0',
      clientInfo: {
        ip: clientIp,
        geo: geo
      },
      serverInfo: {
        region: server?.region,
        requestId: server?.requestId
      }
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
