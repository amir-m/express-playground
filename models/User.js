module.exports = function(mongoose) {

	var crypto = require('crypto');

	// defining schemas
	var UserSchema = mongoose.Scchema({
		id: mongoose.Schema.Types.ObjectId,
		email: {type: String, required: true},
		password: {type: String, required: true},
		name: {type: String, required: true},
		isMale: Boolean,
		dob: Date,
		createdAt: Date,
		lastModifiedAt: Date,
		decativated: {
			timestamp: Date
		},
		tags: [String],
		description: String
	});

	// schema settings
	UserSchema.set('autoIndex', false);
	UserSchema.index({
		name: 1,
		email: 1,
		tags: 1
	});

	// models
	var User = mongoose.model('User', UserSchema);

	var create = function(options, callback){
		options.password = crypto.createHash('sha256').update(options.password).digest('hex')
		var user = new User(options);
		user.save(function(err){
			if (err) return callback({error: err});
			callback({success: true});
		});
	};

	var update = function(options){};

	var remove = function(){};

	var authenticate = function(email, password, callback){

	};

	return {
		User: User,
		create: create,
		update: update,
		remove: remove,
		authenticate: authenticate
	};
};