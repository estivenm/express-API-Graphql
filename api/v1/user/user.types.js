/**
 * @author: Juan Estiven Mazo <estivenm930@gmail.com>
 *id_token: Int,
  idusuario_web: Int,
  estado: Int,
  token: String,
  fecha: String,
 */

console.log('------------------------------------');
console.log('en types');
console.log('------------------------------------');

module.exports = `

type User {
    idusuario_web:Int!
    dsnombre_completo: String!
    dscorreo_electronico: String!
    activo: String!
    femodificacion:String! @deprecated(reason: "Este campo no estara disponible para nuevas versiones.")
    usuariosWebDato:[UserDato]
    userCategory:[Category]
    userToken: UserLoginToken
}

type UserDato {
  idusuarios_web_dato:Int!
  idusuarios_web_tipo_dato:Int!
  dsdato:String!
}

type Category{
  idcategoria:Int!
  dsnombre_categoria:String,
  dsdescipcion_categoria: String,
  idusuario_modificacion: Int,
  femodificacion:String
  conference:[Conference]
}

type Conference{
  idconferencia:Int,
  dsnombre_conferencia: String,
  dsautor_conferencia: String,
  dsservidor_streaming: String,
  dsnombre_archivo: String,
  nmduracion_conferencia:Int,
  dsruta_imagen_conferencia: String,
  dscomentario_conferencia: String,
  dsdiploma_conferencia: String,
  feingreso: String,
  febaja: String,
  dsestado_conferencia: String,
  idusuario_modificacion:Int,
  femodificacion: String,
}

type Keywords{
  idconference:Int
  data:[String]
}

type UserLoginToken {
   token: String
}
  input NewUserToken{
    idusuario_web: Int,
    estado: Int,
    token: String,
    fecha: String,
  }

  input UpdateUser {
    dsnombre_completo: String!,
    dscorreo_electronico: String!,
  }

`;
