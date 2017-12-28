/**
 * @author: Juan Estiven Mazo <estivenm930@gmail.com>
 */

const jwt = require('jwt-simple');
const moment = require('moment');
const config = require('../config/config');

function createToken(user) {
  const payload = {
    sub: user,
    iat: moment().unix(), // fecha creation token
    exp: moment().add(30, 'days').unix(), // expired token
  };
  return jwt.encode(payload, config.SECRET_TOKEN);
}

function decodeToken(token) {
  const decoded = new Promise((resolve, reject) => {
    try {
      const payload = jwt.decode(token, config.SECRET_TOKEN);
      // console.log(payload);
      if (payload.sub.activo === 0) {
        reject({
          status: 401,
          menssage: 'token  desactivado',
        });
      }
      if (payload.exp <= moment().unix()) {
        reject({
          status: 401,
          menssage: 'token  ha expirado',
        });
      }
      resolve({ ...payload.sub, token });
    } catch (error) {
      console.log(error.message);
      reject({
        status: 500,
        // menssage: error.message,
        menssage: 'Not have autorizathion',
      });
    }
  });
  return decoded;
}

module.exports = {
  createToken,
  decodeToken,
};
