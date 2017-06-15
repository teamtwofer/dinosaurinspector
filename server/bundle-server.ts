import { Express } from 'express';
import * as webpack from 'webpack';
import * as wepackDevMiddleware from 'webpack-dev-middleware';
import * as webpackHotMiddleware from 'webpack-hot-middleware';
// tslint:disable-next-line:no-var-requires
const config: any = require('../webpack.development.config');

export default (app: Express) => {
  const compiler = webpack(config);
  const middleware = wepackDevMiddleware(
    compiler,
    {
      publicPath: config.output.publicPath,
      // tslint:disable-next-line:object-literal-sort-keys
      hot: true,
      noInfo: true,
      stats: 'minimal',
    } as any,
  );

  app.use(middleware);
  app.use(webpackHotMiddleware(compiler));
};
