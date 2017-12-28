/**
 * @author: Juan Estiven Mazo <estivenm930@gmail.com>
 */

const { Model } = require('objection');
const Conference = require('./Conference');

class ConferenceModule extends Model {
  static get tableName() {
    return 'modulo_conferencia';
  }
  // static get relationMappings() {
  //   return {
  //     conferenceModel: {
  //       relation: Model.HasManyRelation,
  //       modelClass: Conference,
  //       join: {
  //         from: 'modulo_conferencia.idmoduloconferencia',
  //         to: 'conferencia.idconferencia',
  //       },
  //     },
  //   };
  // }
}

module.exports = ConferenceModule;
