import { MidwayConfig } from '@midwayjs/core';
import { User } from '../entity/User';

export default {
  // use for cookie sign key, should change to your own and keep security
  keys: '1722655652896_5788',
  koa: {
    port: 7001,
  },
  typeorm: {
    dataSource: {
      default: {
        /**
         * 单数据库实例
         */
        type: 'mysql',
        host: 'localhost',
        port: 3306,
        username: 'root',
        password: '123456',
        database: undefined,
        synchronize: false,     // 如果第一次使用，不存在表，有同步的需求可以写 true，注意会丢数据
        logging: false,

        // 配置实体模型
        entities: [User],
      }
    }
  },
  cors:{
    // 允许跨域的方法
    allowMethods: ['OPTIONS', 'GET', 'HEAD', 'PUT', 'POST', 'DELETE', 'PATCH'],
    
    // 设置 Access-Control-Allow-Origin 的值
    // 如果需要动态处理，可以设置为一个函数
    origin: (request) => {
      const allowedOrigins = ['http://localhost:5173/', 'http://test.midwayjs.org']; // 允许的域名列表
      const origin = request.header.origin;
      if (allowedOrigins.includes(origin)) {
        return origin;
      }
      // 如果不在允许的域名列表中，可以返回一个特定的字符串或 '*'
      return '*';
    },
    
    // 允许的请求头
    allowHeaders: ['Content-Type', 'Authorization'],
    
    // 设置 Access-Control-Expose-Headers 的值
    exposeHeaders: ['Content-Length', 'X-Request-ID'],
    
    // 是否允许发送 Cookie
    credentials: true,
    
    // 是否在执行报错的时候，把跨域的 header 信息写入到 error 对的 headers 属性中
    keepHeadersOnError: true,
    
    // 设置 Access-Control-Max-Age
    maxAge: 3600, // 单位是秒，设置为 1 小时
  }
} as MidwayConfig;

