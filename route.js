var express = require('express');
var router = express.Router();

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

router.get('/newradio', function(req, res) 
{
  res.render('newradio');
});

module.exports = router;
