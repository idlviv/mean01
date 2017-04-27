var express = require('express');
var router = express.Router();
var mongojs = require('mongojs');
var config = require('../config');
var db = mongojs(config.get('mongojs:uri'), ['tasks']);

//All tasks
router.get('/tasks', function(req, res, next) {
  db.tasks.find(function(err, tasks) {
    if (err) {
      res.send(err);
    }
    res.send(tasks);
  });
});

//Single task
router.get('/task/:id', function(req, res, next) {
  db.tasks.findOne(
    {_id: mongojs.ObjectId(req.params.id)},
    function(err, task) {
      if (err) {
        res.send(err);
      }
      res.send(task);
  });
});

//Save task
router.post('/task', function(req, res, next) {
  var task = req.body;
  if (!task.title || (task.isDone + '')) {
    res.status(400);
    res.send({
      "error": "Bad data"
    });
  } else {
    db.task.save(task, function (err, task) {
      if (err) {
        res.send(err);
      }
      res.send(task);
    });
  }
});

module.exports = router;
