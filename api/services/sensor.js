let Sensor = require('../models/sensor');

module.exports.getSensor = function (query_obj) {
  return new Promise((resolve, reject) => {
    Sensor.findOne(query_obj, (err, data) => {
      if (err) {
        reject(err);
      }
      resolve(data);
    });
  });
}
