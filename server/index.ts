import 'reflect-metadata';

import { NestFactory } from '@nestjs/core';
import bodyParser = require('body-parser');
import compression = require('compression');
import helmet = require('helmet');
import enforceSSL = require('express-enforces-ssl');
import * as express from 'express';
import * as morgan from 'morgan';
import * as path from 'path';
import bundle from './bundle-server';
import { ApplicationModule } from './modules/application.module';

const isProduction = process.env.NODE_ENV === 'production';
const port = process.env.PORT || 3001;
const publicPath = path.resolve(__dirname, '../public');

const server = express();
server.enable('trust proxy');
server.use(compression());
server.use(morgan('dev'));
server.use(helmet());
server.use(express.static(publicPath));
server.use(bodyParser.json());
if (isProduction) {
  server.use(enforceSSL());
}

server.get('*', (req, res, next) => {
  const isHTMLRequest =
    !req.url.includes('api') &&
    !req.url.includes('.') &&
    !req.url.includes('webpack');

  if (!isProduction && isHTMLRequest) {
    req.url = '/';
  } else if (isHTMLRequest) {
    res.sendFile('/public/build/index.html', {
      root: './',
    });
    return;
  }
  next('route');
});

if (!isProduction) {
  bundle(server);
}

const app = NestFactory.create(ApplicationModule, server);
app.setGlobalPrefix('api');
app.listen(port, () => {
  // tslint:disable-next-line:no-console
  console.info('Application is listening on port ' + port);
});
