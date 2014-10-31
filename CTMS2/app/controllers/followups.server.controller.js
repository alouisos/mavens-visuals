'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	errorHandler = require('./errors'),
	Followup = mongoose.model('Followup'),
	_ = require('lodash');

/**
 * Create a Followup
 */
exports.create = function(req, res) {
	var followup = new Followup(req.body);
	followup.user = req.user;

	followup.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(followup);
		}
	});
};

/**
 * Show the current Followup
 */
exports.read = function(req, res) {
	res.jsonp(req.followup);
};

/**
 * Update a Followup
 */
exports.update = function(req, res) {
	var followup = req.followup ;

	followup = _.extend(followup , req.body);

	followup.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(followup);
		}
	});
};

/**
 * Delete an Followup
 */
exports.delete = function(req, res) {
	var followup = req.followup ;

	followup.remove(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(followup);
		}
	});
};

/**
 * List of Followups
 */
exports.list = function(req, res) { 
	Followup.find({_trial:req.param('queryId')}).exec(function(err, followups) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(followups);
		}
	});
};

/**
 * Followup middleware
 */
exports.followupByID = function(req, res, next, id) { Followup.findById(id).populate('user', 'displayName').exec(function(err, followup) {
		if (err) return next(err);
		if (! followup) return next(new Error('Failed to load Followup ' + id));
		req.followup = followup ;
		next();
	});
};

/**
 * Followup authorization middleware
 */
exports.hasAuthorization = function(req, res, next) {
	if (req.followup.user.id !== req.user.id) {
		return res.status(403).send('User is not authorized');
	}
	next();
};