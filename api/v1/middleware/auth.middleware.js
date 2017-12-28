/**
 * @author: Juan Estiven Mazo <estivenm930@gmail.com>
 */

const authUtils = require('../utils/auth.util');

function isAut(req, res, next) {
  // console.log('aca', req.headers.authorizations);
  // console.log('aca', req.params.token);
  // console.log(req.headers.cookie);
  if (!req.headers.authorizations) {
    if (!req.params.token) return res.status(403).send({ menssage: 'Not have autorizathion' });
  }
  let token = req.headers.authorizations;
  if (token == null) {
    token = req.params.token.split(' ')[1];
  } else {
    token = req.headers.authorizations.split(' ')[1];
  }
  // console.log('token en auth:', token);

  authUtils.decodeToken(token)
    .then((response) => {
      // console.log('response es', response)
      // req.data = response;
      // console.log(response);
      // res.status(200).send(response);
      // res.locals = { user: response };
      req.session.user = response;
      next();
    })
    .catch((response) => {
      console.log('object');
      res.status(200).send(response);
    });
}

module.exports = isAut;
