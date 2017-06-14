import { Express } from 'express';
import * as webpack from 'webpack';
import * as wepackDevMiddleware from 'webpack-dev-middleware';
import * as webpackHotMiddleware from 'webpack-hot-middleware';
import path = require('path');
// tslint:disable-next-line:no-var-requires
const config: any = require('../webpack.development.config');

export default (app: Express) => {
  const compiler = webpack(config);
  const middleware = wepackDevMiddleware(
    compiler,
    {
      publicPath: config.output.publicPath,
      // tslint:disable-next-line:object-literal-sort-keys
      contentBase: 'client',
      stats: {
        colors: true,
        hash: false,
        timings: true,
        // tslint:disable-next-line:object-literal-sort-keys
        chunks: false,
        chunkModules: false,
        modules: false,
      },
    } as any,
  );

  app.use(middleware);
  app.use(webpackHotMiddleware(compiler));

  app.get('*', function response(_req, res) {
    res.write(
      (middleware as any).fileSystem.readFileSync(
        path.join(__dirname, 'build/index.html'),
      ),
    );
    res.end();
  });
};
