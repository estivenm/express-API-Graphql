/**
 * @author: Juan Estiven Mazo <estivenm930@gmail.com>
 */
const { Model } = require('objection');
const Conference = require('./Conference');
// `${__dirname}/Conference`

class Category extends Model {
  static get tableName() {
    return 'categorias';
  }
  static get relationMappings() {
    return {
      conference: {
        relation: Model.ManyToManyRelation,
        modelClass: Conference,
        join: {
          from: 'categorias.idcategoria',
          through: {
            from: 'conferencia_categoria.idcategoria',
            to: 'conferencia_categoria.idconferencia',
          },
          to: 'conferencia.idconferencia',
        },
      },
    };
  }
}

module.exports = Category;
