const express = require('express');
let router = express.Router();

router.get('/', (req, res) => {
  res.json({
    message: 'Hello world'
  });
});

module.exports = router;
