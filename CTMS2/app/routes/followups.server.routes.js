'use strict';

module.exports = function(app) {
	var users = require('../../app/controllers/users');
	var followups = require('../../app/controllers/followups');
	var queries = require('../../app/controllers/queries');

	// Followups Routes
	app.route('/queries/:queryId/followups/:followupId')
		.get(queries.read, followups.read)
		.put(users.requiresLogin, queries.update)
		.delete(users.requiresLogin, queries.delete);

	app.route('/queries/:queryId/followups')
		.get(followups.list)
		.post(users.requiresLogin, followups.create);


	app.route('/followups/:followupId')
		.get(followups.read)
		.put(users.requiresLogin, followups.hasAuthorization, followups.update)
		.delete(users.requiresLogin, followups.hasAuthorization, followups.delete);

	// Finish by binding the Followup middleware
	app.param('followupId', followups.followupByID);

};