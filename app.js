
/**
 * Module dependencies.
 */

var express = require('express');
var http = require('http');
var path = require('path'); 
var colors = require('colors');

var routes = require('./routes/index');
var user = require('./routes/user');

var app = express();

// all environments
app.set('port', process.env.PORT || 8080);
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.set('view options', {layout: false});
app.use(express.static(path.join(__dirname, '/public')));
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(express.cookieParser());
app.use(express.session({secret:'doob.io is TOP SECRET!'}));
app.use(app.router);

// Colors themes
colors.setTheme({
  silly: 'rainbow',
  input: 'grey',
  verbose: 'cyan',
  prompt: 'grey',
  info: 'green',
  data: 'grey',
  help: 'cyan',
  warn: 'yellow',
  debug: 'blue',
  error: 'red'
});

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

// Public static files
app.get('/public/*', routes.public);

// If the user is not authenticated, redirect it to '/login'.
app.get('/', routes.index);

// Main Authentication route.
app.post('/login', user.login);

// app.get('/users', user.list);
http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});




