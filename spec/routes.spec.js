describe('routes suites.', function(){
	
	var scripts = require('../scripts.js');

	// describe('user.exists route', function(){

	// 	it('user.exists should respond with 200 status code', function(done) {
	// 		scripts.userExists('amir@doob.io', function(statusCode){
	// 			expect(statusCode).toEqual(409);
	// 			done();
	// 		});
	// 	});

	// 	it('user.exists should respond with 409 status code', function(done) {
	// 		scripts.userExists('john@doob.io', function(statusCode){
	// 			expect(statusCode).toEqual(200);
	// 			done();
	// 		});
	// 	});
		
	// });

	describe('user.login route', function(){

		// it('user.login should respond with 400 status code', function(done){
		// 	scripts.loginUser({email: 'x@y.com'}, function(statusCode){
		// 		expect(statusCode).toEqual(400);
		// 		done();
		// 	});
		// });

		// it('user.login should respond with 401 status code', function(done){
		// 	scripts.loginUser({email: 'amir@doob.io', password: 'fake'}, function(statusCode){
		// 		expect(statusCode).toEqual(401);
		// 		done();
		// 	});
		// });

		it('user.login should respond with 200 status code', function(done){
			scripts.loginUser({email: 'amir@doob.io', password: 'mypassword'}, function(statusCode){
				expect(statusCode).toEqual(200);
				done();
			});
		});
	});

	// describe('user.register route', function(){

	// 	it('user.register should respond with 400', function(done){
	// 		scripts.registerUser({email: 'amir@doob.io', password: 's'}, function(statusCode){
	// 			expect(statusCode).toEqual(400);
	// 			done();
	// 		});
	// 	});

	// 	it('user.register should respond respond with 400', function(done){
	// 		scripts.registerUser({email: 'amir@doob.io', password: 's', name: 'amir'}, function(statusCode){
	// 			expect(statusCode).toEqual(400);
	// 			done();
	// 		});
	// 	});

	// 	it('user.register should respond respond with 200', function(done){
	// 		scripts.registerUser({email: 'test1@doob.io', password: 'test1', name: 'test1'}, function(statusCode){
	// 			expect(statusCode).toEqual(200);
	// 			done();
	// 		});
	// 	});
	// });

});