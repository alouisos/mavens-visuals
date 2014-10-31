 'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * Query Schema
 */
var querySchema = new Schema({
	trialName: { 
		type: String, 
		default: '', 
		required: 'Please Fill trial Name', 
		trim: true, 
	}, 
	trialDescription: { 
		type: String, 
		default: '', 
		required: 'Please fill trial description', 
	}, 
	followups: [{type: Schema.ObjectId, ref:'Followup'}]
	// , 
	// patients:  
	// 	[{
	// 		type: Schema.ObjectId, ref: 'Patient'
	// 	}], 
	// followups:  
	// 	[{ 
	// 		type: Schema.ObjectId, ref: 'Followup'
	// 	}]
});



// 	patientID: {
// 		type: String,
// 		default: '',
// 		required: 'Please fill PatientID ',
// 		trim: true
// 	},
// 	followups: { 
// 		type: String, 
// 		default: 'Followup', 
// 		required: 'Please fill Followup Event', 
// 		trim: true, 
// 		dateExpected: {type: Date, default: false}, 
// 		response: {Received: {type: Boolean, default: false, date: {type: Date, default: false} }}
// 	}, 
// 	hasResponse: { 
// 		type: Boolean, 
// 		default: false
// 	}, 
// 	hasResponseDate: { 
// 		type: Date, 
// 		default: Date.now
// 	},

	 
// 	hasfutureDate: { 
// 		type: Date
// 	}, 

// 	created: {
// 		type: Date,
// 		default: Date.now
// 	},
// 	user: {
// 		type: Schema.ObjectId,
// 		ref: 'User'
// 	}
// });

mongoose.model('Query', querySchema);