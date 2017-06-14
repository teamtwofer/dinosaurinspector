import {Express} from 'express';
import * as webpack from 'webpack';
import * as wepackDevMiddleware from 'webpack-dev-middleware';
import * as webpackDevServer from 'webpack-dev-server';
import * as webpackHotMiddleware from 'webpack-hot-middleware';
// tslint:disable-next-line:no-var-requires
const config: any = require('../webpack.development.config');

export default (app: Express) => {
  const compiler = webpack(config);
  const middleware = wepackDevMiddleware(compiler, {
    publicPath: config.output.publicPath,
    // tslint:disable-next-line:object-literal-sort-keys
    contentBase: 'src',
    stats: {
      colors: true,
      hash: false,
      timings: true,
      // tslint:disable-next-line:object-literal-sort-keys
      chunks: false,
      chunkModules: false,
      modules: false,
    },
  } as any);

  const bundler = new webpackDevServer(compiler, {
    hot: true,
    noInfo: true,
    publicPath: '/build/',
    quiet: false,
    stats: {
      colors: true,
    },
  });

  app.use(middleware);
  app.use(webpackHotMiddleware(compiler));

  bundler.listen(8080, 'localhost', () => {
    // tslint:disable-next-line:no-console
    console.log('Bundling project, please wait...');
  });
};
