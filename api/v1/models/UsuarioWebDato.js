/**
 * @author: Juan Estiven Mazo <estivenm930@gmail.com>
 */

const { Model } = require('objection');

class UsuarioWebDato extends Model {
  static get tableName() {
    return 'usuarios_web_dato';
  }
}

module.exports = UsuarioWebDato;
