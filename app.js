
/**
 * Module dependencies.
 */

var express = require('express');
var routes = require('./routes');
var user = require('./routes/user');
var http = require('http');
var path = require('path');

var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.get('/', routes.index);
app.get('/users', user.list);

var server = http.createServer(app);
var io = require("socket.io").listen(server);

server.listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});

io.enable("browser client minification");
io.enable("browser client etag");
//io.enable("browser client gzip");
io.set("log level",1);
io.set("transports",["xhr-polling"]);
io.set("polling duration",10);

io.on("connection",function(client){
	console.log("novo cliente logado");
	
	client.on("send-name",function(name){
		client.set("name",name);
	})
	
	client.on("send-message",function(message){
		client.get("name",function(error,name){
			message.nome = name;
			console.log(message);
			client.broadcast.emit("back-message",message);
		})
	})
});
