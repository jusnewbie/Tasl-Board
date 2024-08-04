import { Configuration, App } from '@midwayjs/core';
import * as koa from '@midwayjs/koa';
import * as cors from 'koa2-cors';
import * as validate from '@midwayjs/validate';
import * as info from '@midwayjs/info';
import * as JwtService  from '@midwayjs/jwt';
import * as crossDomain from '@midwayjs/cross-domain';
import { join } from 'path';
// import { DefaultErrorFilter } from './filter/default.filter';
// import { NotFoundFilter } from './filter/notfound.filter';
import { ReportMiddleware } from './middleware/report.middleware';

import { JwtMiddleware } from './middleware/jwt.midlleware';

@Configuration({
  imports: [
    koa,
    validate,
    JwtService,
    {
      component: info,
      enabledEnvironment: ['local'],
    },
    crossDomain
  ],
  importConfigs: [join(__dirname, './config')],
})
export class MainConfiguration {
  @App('koa')
  app: koa.Application;

  async onReady() {
    // add middleware
    this.app.useMiddleware([ReportMiddleware, JwtMiddleware]);
    this.app.use(cors({
      origin: '*',
      allowMethods: ['OPTIONS,GET,HEAD,PUT,POST,DELETE,PATCH'],
      credentials: true,
    }));
    // add filter
    // this.app.useFilter([NotFoundFilter, DefaultErrorFilter]);
  }
}
