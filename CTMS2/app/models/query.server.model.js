'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * Query Schema
 */
var QuerySchema = new Schema({
	patientID: {
		type: String,
		default: '',
		required: 'Please fill PatientID ',
		trim: true
	},
	patientSite: { 
		type: String, 
		default: '', 
		required: 'Please fill Patient Site', 
		trim: true
	}, 
	hasResponse: { 
		type: Boolean, 
		default: false
	}, 
	hasResponseDate: { 
		type: Date, 
		default: Date.now
	}, 
	created: {
		type: Date,
		default: Date.now
	},
	user: {
		type: Schema.ObjectId,
		ref: 'User'
	}
});

mongoose.model('Query', QuerySchema);