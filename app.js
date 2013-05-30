
/**
 * Module dependencies.
 */

var express = require('express');
var http = require('http');
var mongoose = require('mongoose');
var path = require('path'); 
var colors = require('colors');

var app = express();

// all environments
app.set('port', process.env.PORT || 8080);
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.set('view options', {layout: false});
app.use(express.static(path.join(__dirname, '/public')));
app.use(express.favicon('./public/img/icon.png'));
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(express.cookieParser());
app.use(express.session({secret:'doob.io is TOP SECRET!'}));
app.use(app.router);

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

mongoose.connect("mongodb://localhost/doob", function(err){
    if (err) throw err;
});

var models = {
  User: require('./models/User')(mongoose)
};

var userRoutes = require('./routes/user')(colors, mongoose, models);
var routes = {
  index: require('./routes/index').index,
  public: require('./routes/index').public,
  login: userRoutes.login,
  exists: userRoutes.exists,
  register: userRoutes.register
};


// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}
app.get('/public/*', routes.public);

app.get('/', routes.index);

app.get('/exists', routes.exists);

app.post('/login', routes.login);

app.post('/register', routes.register);

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});




