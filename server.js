var express = require('express');
var server = express.Router();

var mongojs = require('mongojs');
var db = mongojs('mongodb://harirajan:shadiomusic@ds157268.mlab.com:57268/heroku_3q1lv5sn', ['users_authentication'])

server.post('/server/register_user', function(req, res) 
{
  db.users_authentication.insertOne(
  { 
    'username': req.body.username,
    'password': req.body.password,
    'security_question': req.body.securityQuestion,
    'security_answer': req.body.securityAnswer
  });
});

server.post('/server/login_user', function(req, res) 
{
  db.users_authentication.findOne(
  {
    'username': req.body.username,
    'password': req.body.password
  },
  function(err, result)
  {
    if(err) 
    {
      res.send({ error: "error occurred"});
    }
    else if (result)
    {
      res.send(result);
    }
    else 
    {
      res.send({ error: "result is null"});
    }
  });
});

module.exports = server;