
/*
 * GET users listing.
 */

exports.list = function(req, res){
	res.send("respond with a resource");
};

exports.login = function(req, res){
	if (!req.param('email') || req.param('email').length < 1 || 
		!req.param('password') || req.param('password').length < 1) {
		res.status(400);
		console.log('POST /login: Missing Username or Password.'.error);
		return res.send('Username or Password Are Required.');
	};
	if (req.session.loggedIn) return res.redirect('/');
	console.log('email: %s, \tpassword: %s', req.param('email'), req.param('password'));
	res.status(200);
	res.send('Succeeded :)');
};
