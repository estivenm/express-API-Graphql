/**
 * @author: Juan Estiven Mazo <estivenm930@gmail.com>
 */

const jwt = require('jsonwebtoken');
const config = require('../config/config');

const secret = config.SECRET_TOKEN;

function sign(payload) {
  // console.log(jwt.sign(payload, secret, callback));
  return jwt.sign(payload, secret, { expiresIn: '1d' });
}

function verify(req, res, next) {
  if (!req.headers.authorizations) return res.status(401).send({ menssage: 'Not have autorizathion' });
  // const token = req.headers.authorizations.split(' ')[1];
  const token = req.headers.authorizations.split('Bearer').pop().trim();
  return jwt.verify(token, secret, (err, data) => {
    // console.log(data);
    if (err) return res.status(401).send({ menssage: 'Not have autorizathion' });
    // if (data.sub.activo != 1) return res.status(401).send({ menssage: 'token  desactivado' });
    if (data.activo !== '1') return res.status(401).send({ menssage: 'token  disabled' });
    req.session.user = data;
    next();
    return data;
  });
}

module.exports = {
  sign,
  verify,
};
