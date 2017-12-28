/**
 * @author: Juan Estiven Mazo <estivenm930@gmail.com>
 */

const express = require('express');
const cors = require('cors');
const config = require('./config/config');
const expressConfig = require('./config/express');
const routeConfig = require('./routes');

const app = express();
const corsOptions = {
  origin: 'http://localhost:3000',
  optionsSuccessStatus: 204,
  allowedHeaders: 'Content-Type, authorizations',
};
app.use(cors(corsOptions));
// app.use(function (req, res, next) {

//     // Website you wish to allow to connect
//     res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');

//     // Request methods you wish to allow
//     res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

//     // Request headers you wish to allow
//     res.setHeader('Access-Control-Allow-Headers', 'Authorization');

//     // Set to true if you need the website to include cookies in the requests sent
//     // to the API (e.g. in case you use sessions)
//     res.setHeader('Access-Control-Allow-Credentials', true);

//     // Pass to next layer of middleware
//     next();
// });

expressConfig(app);
routeConfig(app);

app.listen(config.port, () => {
  console.info(`Aplicación conectada en el puerto:${config.port} y corriendo correctamente.`);
  console.log(`http://localhost:${config.port}/api/v1/user/graphiql`);
});
