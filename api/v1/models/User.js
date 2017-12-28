/**
 * @author: Juan Estiven Mazo <estivenm930@gmail.com>
 */

const { Model } = require('objection');
const UsuarioWebDato = require('./UsuarioWebDato');
const Category = require('./Category');
const UserLoginToken = require('./UserLoginToken');

class User extends Model {
  static get tableName() {
    return 'usuarios_web';
  }
  static get relationMappings() {
    return {
      usuariosWebDato: {
        relation: Model.HasManyRelation,
        modelClass: UsuarioWebDato,
        join: {
          from: 'usuarios_web.idusuario_web',
          to: 'usuarios_web_dato.idusuario_web',
        },
      },
      userCategory: {
        relation: Model.ManyToManyRelation,
        modelClass: Category,
        join: {
          from: 'usuarios_web.idusuario_web',
          through: {
            from: 'usuarios_web_categorias.idusuario_web',
            to: 'usuarios_web_categorias.idcategoria',
          },
          to: 'categorias.idcategoria',
        },
      },
      userToken: {
        relation: Model.BelongsToOneRelation,
        modelClass: UserLoginToken,
        join: {
          from: 'usuarios_web.idusuario_web',
          to: 'ingreso_usuario_token.idusuario_web',
        },
      },
    };
  }
}

module.exports = User;
