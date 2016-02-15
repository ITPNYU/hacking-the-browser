// See the README file for instructions on how to run this server

var app = require('express')();
var server = require('http').Server(app);
var io = require('socket.io')(server);
var port = 3201;

server.listen(port);

io.on('connection', function (socket) {
  socket.emit('news', { hello: 'world' });
  socket.on('my other event', function (data) {
    console.log('server received "my other event" with data:',data);
  });
});

console.log('Socket server running on port: ' + port);
