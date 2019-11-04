import express from 'express';
import bodyParser from 'body-parser';

import routes from './routes';

class App {
  constructor() {
    this.server = express();

    this.middlewares();
    this.routes();
    // this.exceptionHandler();
  }

  middlewares() {
    this.server.use(
      bodyParser.urlencoded({
        extended: false,
      })
    );
    this.server.use(express.json());
  }

  routes() {
    this.server.use(routes);
  }

  exceptionHandler() {
    this.server.use(async (err, req, res, next) => {
      return res.status(500).json({ error: 'Internal Server Error' });
    });
  }
}

export default new App().server;
