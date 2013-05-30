exports.User = function(mongoose) {

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

	var create = function(){};

	var update = function(){};

	var remove = function(){};

	var authenticate = function(email, password, callback){

	};

	return {
		create: create,
		update: update,
		remove: remove,
		authenticate: authenticate
	};
};