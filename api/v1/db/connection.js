/**
 * @author: Juan Estiven Mazo <estivenm930@gmail.com>
 */

const config = require('../config/config');
const objection = require('objection');

const Model = objection.Model;
const Knex = require('knex');

// Initialize knex connection.
const knex = Knex({
  client: 'mysql',
  useNullAsDefault: true,
  connection: config.db,
});

// Give the connection to objection.
const connection = () => Model.knex(knex);

// const inquirer = require('inquirer');
// const chalk = require('chalk');
// const prompt = inquirer.createPromptModule();
// async function hola() {
//   const aswer = await prompt([
//     {
//       type: 'confirm',
//       name: 'setup',
//       message: 'desea conectarse ala bd?',
//     },
//   ]);

//   if (!aswer.setup) {
//     return console.log('hola');
//   }
// }
// console.log('------------------------------------');
// console.log(`${chalk.green('[Conection]')}`);
// console.log('------------------------------------');

// hola();

module.exports = { connection };
