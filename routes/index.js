
/*
 * GET home page.
 */

exports.index = function(req, res){
  res.sendfile('views/login.html');
};

exports.public = function(req, res, next){
	res.sendfile('public/'+req.params[0]);
};