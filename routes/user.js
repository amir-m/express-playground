
/*
 * GET users listing.
 */

exports.list = function(req, res){
	res.send("respond with a resource");
};

exports.login = function(req, res){
	console.log('email: %s, \tpassword: %s', req.param('email'), req.param('password'));
	res.status(200);
	res.send('Succeeded :)');
};
