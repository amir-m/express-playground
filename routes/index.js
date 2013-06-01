
/*
 * GET home page.
 */

exports.index = function(req, res){
	if (req.session && req.session.loggedIn) {
		console.log('Request received from user: %s', req.session.userId);
		res.send('hello world!');
		delete req.session.loggedIn;
		delete req.session.userId;
		return;
	}
	return res.sendfile('views/login.html');
};

exports.public = function(req, res, next){
	res.sendfile('public/'+req.params[0]);
};