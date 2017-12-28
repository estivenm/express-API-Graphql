/**
 * @author: Juan Estiven Mazo <estivenm930@gmail.com>
 */

const { Model } = require('objection');
const ConferenceModule = require('./ConferenceModule');
const Conference = require('./Conference');

class ConferenceIncome extends Model {
  static get tableName() {
    return 'ingreso_conferencia';
  }
  static get relationMappings() {
    return {
      moduleConference: {
        relation: Model.ManyToManyRelation,
        modelClass: ConferenceModule,
        join: {
          from: 'ingreso_conferencia.idconferencia',
          through: {
            from: 'conferencia_modulo_conferencia.idconferencia',
            to: 'conferencia_modulo_conferencia.idmodulo_conferencia',
          },
          to: 'modulo_conferencia.idmodulo_conferencia',
        },
      },
      conference: {
        relation: Model.HasManyRelation,
        modelClass: Conference,
        join: {
          from: 'ingreso_conferencia.idconferencia',
          to: 'conferencia.idconferencia',
        },
      },
    };
  }
}
module.exports = ConferenceIncome;
