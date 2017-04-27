var express = require('express');
var router = express.Router();
var mongojs = require('mongojs');
var config = require('./config');
var db = mongojs(config.get('mongojs:uri'), [tasks]);

router.get('/tasks', function(req, res, next) {
  res.send('tasks');
});

module.exports = router;
