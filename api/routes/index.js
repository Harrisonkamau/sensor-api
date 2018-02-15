const express = require('express');
let router = express.Router();


// GET: /api/
router.get('/', (req, res) => {
  res.json({
    message: 'Hello world'
  });
});

module.exports = router;

module.exports._dbQuery = function(model) {
  return new Promise((resolve, reject) => {
    model.find({}, (err, result) => {
      if (err) {
        reject(err);
      }
      resolve(result);
    })
  });
}
