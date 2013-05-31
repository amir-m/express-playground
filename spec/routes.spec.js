describe('routes suites.', function(){
	
	ar scripts = require('../scripts.js');

	describe('user.exists route', function(){

		it('should respond with 200 status code', function(done) {
		
			scripts.userExists('amir@doob.io', function(statusCode){
				console.log('statusCode: ' + statusCode);
				expect(statusCode).toEqual(409);
				done();
			});
		
		});

		it('should respond with 409 status code', function(done) {
		
			scripts.userExists('john@doob.io', function(statusCode){
				console.log('statusCode: ' + statusCode);
				expect(statusCode).toEqual(200);
				done();
			});
		
		});
		
	});

	describe('user.login route', function(){});

	describe('user.register route', function(){});

});