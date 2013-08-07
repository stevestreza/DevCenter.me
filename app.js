
/**
 * Module dependencies.
 */

var express = require('express');
var routes = require('./routes');
var http = require('http');
var path = require('path');
var sass = require('node-sass');
var hbs  = require('hbs');

var app = express();

app.configure(function(){
	app.set('port', process.env.PORT || 4230);
	app.set('views', __dirname + '/views');
	app.set('view engine', 'hbs');
	app.use(express.favicon());
	app.use(express.logger('dev'));
	app.use(express.bodyParser());
	app.use(express.methodOverride());
	app.use(app.router);
	app.use(sass.middleware({
		src:  path.join(__dirname, 'scss'),
		dest: path.join(__dirname, 'public'),
		debug: (process.env.NODE_ENV === "development")
	}));
	app.use(express.static(path.join(__dirname, 'public')));

	app.locals.hostname = process.env.HOSTNAME || 'devcenter.me';
});

app.configure('development', function(){
	app.use(express.errorHandler());
});

routes.setup(app);

http.createServer(app).listen(app.get('port'), function(){
	console.log("Express server listening on port " + app.get('port'));
});
