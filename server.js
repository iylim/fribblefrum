var express = require('express');
var path = require('path');
var logger = require('morgan');
require('dotenv').config();
require('./config/database');

var app = express();
var server = require('http').Server(app);
require('./io').init(server);

app.use(logger('dev'));

//middleware
app.use(express.static(path.join(__dirname, 'build')));
app.use(express.json());

//routes
app.use('/api/users', require('./routes/api/users'));
//protected routes
app.use(require('./config/auth'));
app.use('/api/questions', require('./routes/api/questions'));
app.use('/api/rooms', require('./routes/api/rooms'));

//catch all
app.get('/*', function(req, res) {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
  });

//use port 3001
var port = process.env.PORT || 3001;

server.listen(port, function() {
  console.log(`Express app running on port ${port}`)
});