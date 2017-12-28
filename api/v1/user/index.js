/**
 * @author: Juan Estiven Mazo <estivenm930@gmail.com>
 */

const { graphqlExpress, graphiqlExpress } = require('graphql-server-express');
const { maskErrors } = require('graphql-errors');
const userSchema = require('./user.schema.graphql');
const auth = require('../middleware/auth.middleware');
const { verify } = require('../utils/auth2.util');
const config = require('../config/config');
const authJwt = require('express-jwt');
const guard = require('express-jwt-permissions')();
const contact = require('./contac');

maskErrors(userSchema);

module.exports = (app) => {
  app
    .use(guard.check(['role: admind']))
    .use((err, req, res, next) => {
      if (err.code === 'permission_denied') {
        res.status(401).send('insufficient permissions');
      }
      next();
    })
    .post('/api/v1/contac', contact)
    // .use('/api/v1/user/graphql/', authJwt(config.auth), guard.check(['role: admind']), graphqlExpress({
    // .use('/api/v1/user/graphql/', auth, graphqlExpress({
    .use('/api/v1/user/graphql/', graphqlExpress({
      schema: userSchema,
      // printErrors: true,
      formatError: error => ({
        mensaje: error.message,
      }),
    }))
    .use('/api/v1/user/graphql2/', verify, graphqlExpress({
      schema: userSchema,
  // printErrors: true,
      formatError: error => ({
        mensaje: error.message,
      }),
    }))
  .use('/api/v1/user/graphiql', graphiqlExpress({ endpointURL: '/api/v1/user/graphql' }))
  .use('/api/v1/user/:token', auth, (req, res) => {
    // res.status(200).send({ menssage: res.locals.user });
    // if (req.session.user) return res.status(200).send({ menssage: req.session.user });
    res.status(200).send({ user: req.session.user });
    // console.log(req.headers.authorizations);
    // res.redirect('http://localhost:3000/grap');
    // res.status(200).send({ menssage: 'puede ingresar' });
  })
  .post('/api/v1/login', verify, (req, res) => {
    res.status(200).send({ user: req.session.user });
  });
};

