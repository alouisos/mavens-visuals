'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * Patient Schema
 */
var PatientSchema = new Schema({
	patientID: {
		type: String,
		default: '',
		required: 'Please fill Patient ID',
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
	patientSite: { 
		type: String, 
		default:'', 
		required: 'Please fill site ID', 
		trim: true
	},
	patientTrial: {
		type: Schema.ObjectId, 
		ref:'Query'
	}
});



mongoose.model('Patient', PatientSchema);