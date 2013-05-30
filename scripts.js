var http = require('http');

function registerUser(){
	var options = {
		hostname: 'localhost',
		port: 8080,
		path: '/register',
		method: 'POST',
		headers: {
			"Content-Type": "application/json"
		}
	};

	var req = http.request(options, function(res) {
		console.log('STATUS: ' + res.statusCode);
		res.setEncoding('utf8');
		res.on('data', function (chunk) {
			console.log('BODY: ' + chunk);
		});
	});

	req.on('error', function(e) {
		console.log('problem with request: ' + e.message);
	});

	var user = {
		'name': 'Amir',
		'email': 'amir@doob.io',
		'password': 'mypassword'
	};

	console.log(JSON.stringify(user));
	// write data to request body JSON.stringify(user)
	req.write(JSON.stringify(user));

	req.end();
};