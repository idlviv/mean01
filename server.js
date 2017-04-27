var express = require('express');
var bodyParser = require('body-parser');
// var mongoose = require('mongoose');
var path = require('path');
// var morgan = require('morgan');
var config = require('./config');

var index = require('./routes/index');
var tasks = require('./routes/tasks');

var app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile);

app.use(express.static(path.join(__dirname, 'client')))
// app.use(morgan('dev'));
//
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));

app.use('/', index);
app.use('/api', tasks);

app.listen(config.get('port'), function() {
  console.log('Server on port ' + config.get('port'));
});