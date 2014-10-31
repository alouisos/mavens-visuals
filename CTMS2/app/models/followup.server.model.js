'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * Followup Schema
 */
var FollowupSchema = new Schema({
	trial: { 
		type: Schema.Types.ObjectId, 
		ref:'Query'
	},
	name: {
		type: String,
		default: '',
		required: 'Please fill Followup name',
		trim: true
	},
	created: {
		type: Date,
		default: Date.now
	},
	user: {
		type: Schema.ObjectId,
		ref: 'User'
	}, 
	days_from_baseline: { 
		type: Number, 
		required: 'Please enter the number of days since beseline or 0 if there is no time distance', 
		trim: true
	}
});

mongoose.model('Followup', FollowupSchema);