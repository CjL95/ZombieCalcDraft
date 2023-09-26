var express = require('express');
var router = express.Router();

/* GET home page */
router.get('/', function(req, res, next) {
  res.render('index', { 
  	title: 'Simple Node Template',
  	msg: 'This sample template should help get you on your way.',
  	pageMainClass: 'pgHome'
  });
});

module.exports = router;
