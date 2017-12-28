/**
 * @author:Juan Estiven Mazo Moreno <estivenm930@gmail.com>
**/

const { Model } = require('objection');

class KeywordConference extends Model {
  static get tableName() {
    return 'conferencia_palabras_clave';
  }
}
module.exports = KeywordConference;
