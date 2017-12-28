/**
 * @author: Juan Estiven Mazo <estivenm930@gmail.com>
*/

const { Model } = require('objection');
const KeywordsConference = require('./KeywordConference');

class Conference extends Model {
  static get tableName() {
    return 'conferencia';
  }
  static get relationMappings() {
    return {
      keywordsConference: {
        relation: Model.HasManyRelation,
        modelClass: KeywordsConference,
        join: {
          from: 'conferencia.idconferencia',
          to: 'conferencia_palabras_clave.idconferencia',
        },
      },
    };
  }
}

module.exports = Conference;
