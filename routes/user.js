exports.login = function(req, res){
	if (!req.param('email') || req.param('email').length < 1 || 
		!req.param('password') || req.param('password').length < 1) {
		res.status(400);
		console.log('POST /login: Missing Username or Password.'.error);
		return res.send('Email and Password Are Required.');
	};
	if (req.session.loggedIn) return res.redirect('/');
	console.log('email: %s, \tpassword: %s', req.param('email'), req.param('password'));
	res.status(200);
	res.send('Succeeded :)');
};

exports.register = function(req, res){
	if (!req.param('email') || req.param('email').length < 1 || 
		!req.param('password') || req.param('password').length < 1 || 
		!req.param('name') || req.param('name').length < 1 || req.param('notExists') == false) {
		console.log('POST /register: Bad Registration Request.'.error);
		return res.send(400);
	};
	models.User.exists(req.param('email'), function(yes){
		if (yes) {
			console.log('POST /register: User Exists.'.error);
			return res.send(400)
		};
 		models.User.create({
 			email: req.param('email'),
 			password: req.param('password'),
 			name: req.param('name')
 			//////////////////////////////////
 			/////////////////////////////////////TODO
 			// Add the rest of the model here...
 			/////////////////////////////////////TODO 			
 			//////////////////////////////////
 		}, function(r){
			if (r.error) {
				console.log('models.User.create callback error:'.error);
				console.log(r.error);
				return res.send(500);
			};
			console.log('models.User.create: a user succesfully registered.'.info);
			return res.send(200);
		});
	});
};

exports.exists = function(req, res) {
	if (!req.query.email || req.query.email.length < 1) return res.send();
	models.User.exists(req,query.email, callback(yes){
		if (yes) return res.send(409);
		return res.send(200);
	});
};

var save = function(){
}