// load env variables
require('dotenv').config();

module.exports = {
    port: process.env.PORT || 3000,
    mongodb_uri: process.env.MONGODB_URI,
    API_SECRET: process.env.API_SECRET || 'very-secret'
}
