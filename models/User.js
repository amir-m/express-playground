module.exports = function(mongoose) {

	var crypto = require('crypto');

	// defining schemas
	var UserSchema = new mongoose.Schema({
		id: mongoose.Schema.Types.ObjectId,
		email: {type: String, required: true, unique: true},
		password: {type: String, required: true},
		name: {type: String, required: true},
		isMale: Boolean,
		birthday: {
			day : {type: Number, min: 1, max: 31, required: false},
			month: {type: Number, min: 1, max: 12, required: false},
			year: {type: Number}
		}, 
		photoUrl: {type: String},
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
		options.password = crypto.createHash('sha256').update(options.password).digest('hex');
		options.id = new mongoose.Types.ObjectId;
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

	var exists = function(email, callback) {
		User.findOne({email: email}, function(err, doc){
			if (doc) return callback(true);
			return callback(false);
		});
	};

	return {
		User: User,
		create: create,
		update: update,
		remove: remove,
		authenticate: authenticate,
		exists: exists
	};
};