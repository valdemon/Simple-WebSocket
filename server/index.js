var express = require('express'),
    app     = express(),
    var lambda = new aws.Lambda({
      region: 'us-east-2' //change to your region
    });
    http    = require('http').createServer(app),
    io      = require('socket.io')(http);

const url = "http://www.supremenewyork.com/shop/all/sweatshirts";

http.listen(3000);

app.get('/', function (req, res) {
    res.sendFile(__dirname + '/index.html');
});

io.on('connection', function (socket) {
    socket.emit('news', {
        hello : 'world'
    });

    socket.emit('news', {
        url : 'http://www.supremenewyork.com/shop/all/sweatshirts'
    });

    socket.on('test', function (data) {
      http.get(data.url, function(res) {
        io.emit('test response', {
              success  : true,
              status: res.statusCode,
              received : res.body
          });
      }).on('error', function(e) {
        //console.log("Got error: " + e.message);
        io.emit('test response', {
              success  : false,
              received : e.message
          });
      });
    });
});
