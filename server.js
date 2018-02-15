// Third-party imports
const express = require('express');
const mongoose = require('mongoose');
const bluebird = require('bluebird');
const morgan = require('morgan');
const bodyParser = require('body-parser');


// Local imports
let config = require('./config/config');
let index = require('./routes/index');
let users = require('./routes/users');
let allocations = require('./routes/allocations');
let sensors = require('./routes/sensors');

// db setup
mongoose.Promise = bluebird;
mongoose.connect(config.mongodb_uri, (err, db) => {
  if(err) throw err;
  console.log('Successfully connected to db');
})

// express app
const app = express();

// middleware
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// serve the routes
app.use('/api', index);
app.use('/api/users', users);
app.use('/api/allocations', allocations);
app.use('/api/sensors', sensors);

// start server
app.listen(config.port, () => {
  console.log(`Listening on port: ${config.port}`);
});
