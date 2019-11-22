var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource (You only see this when you logged-in)');
});

module.exports = router;
