const jwt = require('jsonwebtoken');
const API_SECRET = require('../config/config').API_SECRET;


module.exports = function (req, res, next) {
  var token = req.body.token || req.query.token || req.headers['x-access-token'];

  if (token) {
    jwt.verify(token, API_SECRET, (err, decoded) => {
      if (err) {
        return res.json({
          success: false,
          message: "Failed to authenticate token!"
        })
      } else {
        // if authenticated, save to request for use in other routes
        req.decoded = decoded;

        next();
      }
    })
  } else {
    // if no token
    return res.json({
      success: false,
      message: "No token provided"
    })
  }
};
