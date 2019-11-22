var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  const viewData = { 
    title: 'Express',
    username: typeof req.user == 'undefined' ? 'Guest' : req.user.username,
    isLoggedIn: req.isAuthenticated()
  };
  res.render('index', viewData);
});

module.exports = router;
