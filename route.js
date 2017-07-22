var express = require('express');
var router = express.Router();

// /* GET home page. */
router.get('/', function(req, res) 
{
  res.render('index');
});

router.get('/signup', function(req, res) 
{
  res.render('signup');
});

router.get('/login', function(req, res) 
{
  res.render('login');
});

router.get('/home', function(req, res) 
{
  res.render('home');
});

module.exports = router;