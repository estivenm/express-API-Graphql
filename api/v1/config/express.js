/**
 * Express configuration
 * @author: Juan Estiven Mazo <estivenm930@gmail.com>
 */

const bodyParser = require('body-parser');
const compression = require('compression');
const session = require('express-session');

module.exports = (app) => {
  app.use(compression());
  app.use(bodyParser.urlencoded({ extended: false, limit: '50mb' }));
  app.use(session({
    secret: '123',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: true },
  }));
  // app.use(bodyParser.urlencoded({ extended: false }));
  app.use(bodyParser.json());
};
