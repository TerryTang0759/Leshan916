# 阿里云部署方案

## 1. 阿里云函数计算部署

### 创建函数
```bash
# 安装Serverless Framework
npm install -g serverless

# 创建serverless.yml
```

### serverless.yml配置
```yaml
service: leshan-furniture-system

provider:
  name: aliyun
  runtime: nodejs14
  region: cn-hangzhou
  credentials: ~/.aliyun/credentials

functions:
  app:
    handler: server.handler
    events:
      - http:
          path: /{proxy+}
          method: ANY
      - http:
          path: /
          method: ANY

plugins:
  - serverless-aliyun-function-compute
```

## 2. 腾讯云云开发部署

### 创建云开发环境
1. 登录腾讯云控制台
2. 创建云开发环境
3. 上传代码包
4. 配置环境变量

### 环境变量配置
```
MONGODB_USERNAME=terry07590759
MONGODB_PASSWORD=Na0E6iNR4p3gGNg1
MONGODB_CLUSTER=cluster0.zqsy7.mongodb.net
MONGODB_DATABASE=Leshan20250911
MONGODB_COLLECTION=price_template
```

## 3. 华为云FunctionGraph部署

### 创建函数
1. 登录华为云控制台
2. 创建FunctionGraph函数
3. 上传代码包
4. 配置触发器
