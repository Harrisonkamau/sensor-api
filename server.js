// Third-party imports
const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const bodyParser = require('body-parser');


// Local imports
let config = require('./config/config');
let routes = require('./controllers/routes');

// db setup
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
app.use('/api/', routes);

// start server
app.listen(config.port, () => {
  console.log(`Listening on port: ${config.port}`);
});
