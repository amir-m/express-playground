module.exports = function(colors, mongoose, models) {

	var login = function(req, res){
		
		if (req.session.loggedIn) return res.redirect('/');

		if (!req.body.email || req.body.email.length < 1 || 
			!req.body.password || req.body.password.length < 1) {
			res.status(400);
			console.log('POST /login: Missing Username or Password.'.error);
			return res.send('Email and Password Are Required.');
		};

		models.User.authenticate(req.body.email, req.body.password, function(r){
			
			if (r && r.success) {
				console.log('POST /login Successfull Login.'.info);
				req.session.loggedIn = true;
				req.session.userId = r.id;
				return res.send(200);
			}

			if (r && r.erro && r.error.code == 500) {
				console.log('POST /login Failed to fetch the user info!'.error);
				res.status(500);
				return res.send('Sorry! We had a problem logging you in. Please try '
					+ 'again a bit later. Thanks!');

			}

			if (req.session.loggedIn) delete req.session.loggedIn;
			if (req.session.userId) delete req.session.userId;
			return res.send(401);
		});
	};

	var register = function(req, res){
		if (!req.body.email || req.body.email.length < 1 || 
			!req.body.password || req.body.password.length < 1 || 
			!req.body.name || req.body.name.length < 1 || req.body.notExists == false) {
			console.log('POST /register: Bad Registration Request.'.error);
			return res.send(400);
		};
		models.User.exists(req.body.email, function(yes){
			if (yes) {
				console.log('POST /register: User Exists.'.error);
				return res.send(400)
			};
	 		models.User.create({
	 			email: req.body.email,
	 			password: req.body.password,
	 			name: req.body.name
	 			//////////////////////////////////
	 			/////////////////////////////////////TODO
	 			// Add the rest of the model like bio, birthday, etc here...
	 			/////////////////////////////////////TODO 			
	 			//////////////////////////////////
	 		}, function(r){
				if (!r || (r && r.error)) {
					console.log('models.User.create callback error:'.error);
					console.log(r.error);
					return res.send(500);
				};

				console.log('models.User.create: a user succesfully registered.'.info);
				req.session.loggedIn = true;
				req.session.userId = r.id;
				return res.send(200);
			});
		});
	};

	var exists = function(req, res) {
		console.log(req.session.userId);
		if (!req.query.email || req.query.email.length < 1) return res.send();

		models.User.exists(req.query.email, function (yes){
			if (yes) return res.send(409);
			return res.send(200);
		});
	};

	return {
		login: login,
		register: register,
		exists: exists
	}
}