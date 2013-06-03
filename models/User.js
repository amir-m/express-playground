module.exports = function(mongoose) {

	var crypto = require('crypto');

	// defining schemas
	var UserSchema = new mongoose.Schema({
		_id: {type: String, required: true, unique: true},
		email: {type: String, required: true, unique: true},
		password: {type: String, required: true},
		profile: {
			name: {type: String, required: true},
			isMale: Boolean,
			birthday: {
				day : {type: Number, min: 1, max: 31, required: false},
				month: {type: Number, min: 1, max: 12, required: false},
				year: {type: Number}
			}, 
			photoUrl: {type: String},
			photoTumbUrl: {type: String},
			tags: [String],
			bio: String,
			facebookPage: String,
			facebookUser: String,
			soundCloud: String,
			twitter: String,
			instagram: String,
			website: String,
			booking: String
		},
		createdAt: Date,
		lastModifiedAt: Date,
		decativated: {
			timestamp: Date
		},
		followers: [Follower],
		circles: []
	});

	var FollowerSchema = new mongoose.Schema({
		userId: String,
		name: String,
		photoTumbUrl: String
	});

	var CircleSchema = new mongoose.Schema({
		_id: String,
		name: String,
		photoTumbUrl: String, 
		photoUrl: String,
		creator: Follower,
		followers: [followers],
		posts: [Post]
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
		// Base-64 encoding of ObjectId
		options._id = _objectId;
		options.password = _password(options.password);

		var user = new User(options);
		user.save(function(err){
			if (err) {
				console.log('models.User.create callback error:'.error);
				return callback({error: err});
			};
			console.log('models.User.create: a user succesfully registered.'.info);
			return callback({success: true, id: user._id});
		});
	};

	var _objectId = function() {
		return new Buffer((new mongoose.Types.ObjectId).toString()).toString('base64');
	};

	var _password = function(pass) {
		return crypto.createHash('sha256').update(pass).digest('hex');
	};

	var update = function(options){};

	var remove = function(){};

	var authenticate = function(email, password, callback){

		User.findOne({
			email: email,
			password: crypto.createHash('sha256').update(password).digest('hex')
		}, function(err, doc) {
			
			if (err) return callback({
				error: {
					code: 500,
					err: err
				}
			});
				
			if (doc) return callback({success: true, id: doc.id});
			
			callback();

		});
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