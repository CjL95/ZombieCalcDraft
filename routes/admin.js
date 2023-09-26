var express = require('express');
var router = express.Router();

/* GET admin dashboard */
router.get('/', function(req, res, next) {
  res.render('adminDashboard', { 
  	title: 'Admin Section',
  	msg: 'This is where your dashboard for the admins would go',
  	pageMainClass: 'pgAdminDashboard'
  });
});

module.exports = router;
