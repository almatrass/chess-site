const http = require('http'),
      path = require('path'),
      express = require('express'),
      handlebars = require('express-handlebars'),
      socket = require('socket.io');

const config = require('../config');

const myIo = require('./sockets/io'),
      routes = require('./routes/routes');

const app = express(),
      server = http.Server(app),
      io = socket(server);

server.listen(config.port);

games = {};

myIo(io);

console.log(`Server listening on port ${config.port}`);

const Handlebars = handlebars.create({
  extname: '.html', 
  partialsDir: path.join(__dirname, '..', 'front', 'views', 'partials'), 
  defaultLayout: false,
  helpers: {}
});
app.engine('html', Handlebars.engine);
app.set('view engine', 'html');
app.set('views', path.join(__dirname, '..', 'front', 'views'));
app.use('/public', express.static(path.join(__dirname, '..', 'front', 'public')));

routes(app);