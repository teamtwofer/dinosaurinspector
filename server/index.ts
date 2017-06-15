import 'reflect-metadata';

import { NestFactory } from '@nestjs/core';
import * as express from 'express';
import * as morgan from 'morgan';
import * as path from 'path';
import bundle from './bundle-server';
import { ApplicationModule } from './modules/application.module';

const isProduction = process.env.NODE_ENV === 'production';
const port = isProduction ? process.env.PORT : 3000;
const publicPath = path.resolve(__dirname, 'public');
const server = express();
server.use(morgan('dev'));
server.use(express.static(publicPath));

if (!isProduction) {
  bundle(server);
}

const app = NestFactory.create(ApplicationModule, server);
app.setGlobalPrefix('api');
app.listen(port, () => {
  // tslint:disable-next-line:no-console
  console.info('Application is listening on port 3000');
});
