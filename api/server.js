// Third-party imports
const express = require('express');
const mongoose = require('mongoose');
const bluebird = require('bluebird');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const exphbs = require('express-handlebars');
const path = require('path');

// Local imports
let config = require('./config/config');
let index = require('./routes/index');
let users = require('./routes/users');
let allocations = require('./routes/allocations');
let sensors = require('./routes/sensors');

// db setup
mongoose.Promise = bluebird;
mongoose.connect(config.mongodb_uri, (err, db) => {
  if (err) throw err;
  console.log('Successfully connected to db');
})

// express app
const app = express();

// middleware
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.all('/*', function (req, res, next) {
  // CORS headers
  res.header("Access-Control-Allow-Origin", "*"); // restrict it to the required domain
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
  // Set custom headers for CORS
  res.header('Access-Control-Allow-Headers', 'Content-type,Accept,X-Access-Token,X-Key');
  if (req.method == 'OPTIONS') {
    res.status(200).end();
  } else {
    next();
  }
});

app.all('/api/*', [require('./middlewares/validateRequest')]);

// serve the routes
app.use('/api', index);
app.use('/api/users', users);
app.use('/api/allocations', allocations);
app.use('/api/sensors', sensors);


// start server
app.listen(config.port, () => {
  console.log(`Listening on port: ${config.port}`);
});

// connect to socket.io
const http = require('http').Server(app);
const io = require('socket.io')(http);

module.exports = app;
