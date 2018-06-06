var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var session = require('express-session');
var fs = require("fs")

app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile);

var favicon = require('serve-favicon');

app.use(favicon((__dirname + '/assets/img/favicon.png')));
var server = app.listen(3000, function(){
   console.log("Express server has started on port 3000")
});

app.use(express.static('public'));
app.use(express.static(__dirname + '/assets'));


app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(session({
   secret: '@#@$MYSIGN#@$#$',
    resave: false,
     saveUninitialized: true
}));


var router = require('./router/main')(app, fs);

var io = require('socket.io')(server);
io.on('connection', function (socket) {
    socket.emit('news', { hello: 'world' });
    socket.on('imageTransfer', function (data) {
      console.log("image is transffered!");
      socket.broadcast.emit('processPic');
  });
    socket.on('buttonClicked', function (data) {
      console.log("Button clicked!");
      socket.broadcast.emit('processingPic');
  });

});
