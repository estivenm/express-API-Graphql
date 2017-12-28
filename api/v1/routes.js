/**
 * @author: Juan Estiven Mazo <estivenm930@gmail.com>
 */

// Import Endpoints
const user = require('./user');

// Insert routes below
module.exports = (app) => {
  user(app);
};
