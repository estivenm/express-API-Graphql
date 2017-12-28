//  @author: Juan Estiven Mazo < estivenm930@gmail.com>

const { UserError } = require('graphql-errors');
const userModel = require('../models/User');
const userLoginTokenModel = require('../models/UserLoginToken');
const conferenceIncomeModel = require('../models/ConferenceIncome');
const auth = require('../utils/auth.util');
const auth2 = require('../utils/auth2.util');

const config = require('../config/config.js');
const { connection } = require('../db/connection');
const chalk = require('chalk');

connection();
console.log('------------------------------------');
console.log(`${chalk.green('in resolver user')}`);
console.log('------------------------------------');

async function createLoginToken(dataUser) {
  // const token = auth.createToken(dataUser);
  const token = await auth2.sign(dataUser);
  return await userLoginTokenModel.query()
    .insert({ idusuario_web: dataUser.idusuario_web, estado: 1, token });
}

async function updateLoginToken(updateToken) {
  const token = await auth2.sign(updateToken, config.SECRET_TOKEN);
  await userLoginTokenModel.query().patch({ token }).where('idusuario_web', updateToken.idusuario_web);
  return { ...updateToken, token };
}

const resolver = {
  Query: {
    users: () => userModel.query().eager('[usuariosWebDato(orderByName),userCategory,userCategory.conference,userToken]', {
      orderByName: (builder) => {
        builder.orderBy('idusuarios_web_dato', 'DESC');
      },
    }).then(data => data).catch((err) => {
      console.log(`${chalk.red('[Error] user.resolver consultando all users  =>')}${err}`);
      throw new UserError('¡Ups! se ha producido un error en el servidor.');
    }),
    user: (rootValue, args) => userModel.query().eager('[usuariosWebDato,userCategory,userCategory.conference,userToken]')
      .where('dscorreo_electronico', args.emailUser)
      .then((data) => {
        // validate if exist email
        if (data.length < 1) throw new UserError(1);
        const result = data;
        const dataUser = {
          idusuario_web: data[0].idusuario_web,
          dsnombre_completo: data[0].dsnombre_completo,
          dscorreo_electronico: data[0].dscorreo_electronico,
          activo: data[0].activo,
          femodificacion: data[0].femodificacion,
        };
        // create token if it does not exist and insert in table ingreso_usuario_token
        if (data.length > 0 && data[0].userToken == null) {
          result[0].userToken = createLoginToken(dataUser);
          return result;
        }
        // create token if no exist a user login token register
        if (data.length > 0 && data[0].userToken.idusuario_web === data[0].idusuario_web && data[0].userToken.token === '') {
          result[0].userToken = updateLoginToken(dataUser).then(dataLogin => dataLogin);
          // const token = auth2.sign(dataUser, config.SECRET_TOKEN);
          // userLoginTokenModel.query().patch({ token }).where('idusuario_web', dataUser.idusuario_web).then(datas => datas);
          // result[0].userToken = {
          //   token,
          //   estado: 1,
          //   idusuario_web: dataUser.idusuario_web,
          // };
          return result;
        }
        return result;
      })
      .catch((err) => {
        console.log(`${chalk.red('[Error] user.resolver user -> consultado usuario por email => ')}${err}`);
        if (err.message === 1) throw new UserError(`Error no existe usuario con correo:${args.emailUser}`);
        throw new UserError('¡Ups! se ha producido un error en el servidor.');
      }),
    userLogOut: (rootValue, args) => userLoginTokenModel.query().patch({ token: '' }).where('idusuario_web', args.id)
      .then((data) => {
        if (data < 1) throw new UserError(1);
        // throw new UserError(`Error no existe usuario con id:${args.id}`);
        return ({ token: 'usuario desautenticado' });
      })
      .catch((err) => {
        console.log(`${chalk.red('[Error:user.resolver] userLogOut =>')}${err}`);
        if (err.message === 1) throw new UserError(`Error no existe usuario con id:${args.id}`);
        throw new UserError('¡Ups! se ha producido un error en el servidor.');
      }),
    keywords: (rootValue, args) => conferenceIncomeModel.query()
      .where('idusuario_web', args.idUser)
      // .max('feingreso')
      .groupBy('idconferencia')
      .orderBy('feingreso', 'DESC')
      .eager('[moduleConference,conference,conference.keywordsConference]')
      .then((data) => {
        // Validate if exist id of user
        if (data.length < 1) throw new UserError(1);
        // console.log(Object.getOwnPropertyNames(data[0].conference[0]));
        // console.log(data[0].conference[0].keywordsConference[0]);
        let result = {};
        const dataArray = [];
        if (data[0].moduleConference[0].dstipo_visualizacion === 'S') {
          result = {
            idconference: data[0].conference[0].idconferencia,
            data: ['S'],
          };
          return result;
        }
        data.map((nameConference) => {
          if (!nameConference.conference[0].keywordsConference[0]) return nameConference;
          nameConference.conference[0].keywordsConference[0].palabras.split(',')
            .map((words) => {
              if (dataArray.indexOf(words) === -1) return dataArray.push(words);
              return words;
            });
          return nameConference.conference[0].keywordsConference[0];
        });
        // data.map(nameConference => nameConference.conference[0].dsnombre_conferencia.split(',')
        //   .map((words) => {
        //     if (dataArray.indexOf(words) === -1) return dataArray.push(words);
        //     return words;
        //   }),
        // );
        // const valor = data.map(dataCon => dataCon.conference[0].dsnombre_conferencia.split(','));
        // const dataArray = [];
        // for (const key in valor) {
        //   for (const key2 in valor[key]) {
        //     if (dataArray.indexOf(valor[key][key2]) === -1) {
        //       dataArray.push(valor[key][key2]);
        //     }
        //   }
        // }
        result = {
          idconference: -1,
          data: dataArray,
        };
        // console.log(dataArray);
        return result;
      })
      .catch((err) => {
        console.log(`${chalk.red('[Error] :user.resolver consultado keywords =>')}${err}`);
        if (err.message === 1) throw new UserError(`Error no existe id:${args.idUser}`);
        throw new UserError('¡Ups! se ha producido un error en el servidor.');
      }),
  },
  Mutation: {
    NewUserToken: (rootValue, args) => userLoginTokenModel.query().insert(args.userToken)
      // .then(data => auth.createToken(data))
      .then(data => data)
      .catch((err) => {
        console.log(`${chalk.red('[Error:user.resolver] user =>')}${err}`);
        throw new UserError('¡Ups! se ha producido un error en el servidor.');
      }),
  },
};

module.exports = resolver;
