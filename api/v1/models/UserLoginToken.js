/**
 * @author: Juan Estiven Mazo <estivenm930@gmail.com>
 */

const { Model } = require('objection');

class UserLoginToken extends Model {
  static get tableName() {
    return 'ingreso_usuario_token';
  }
}
module.exports = UserLoginToken;
