'use strict';

//Setting up route
angular.module('followups').config(['$stateProvider',
	function($stateProvider) {
		// Followups state routing
		$stateProvider.
		state('listFollowups', {
			url: '/queries/:queryId/followups',
			templateUrl: 'modules/followups/views/list-followups.client.view.html'
		}).
		state('createFollowup', {
			url: '/followups/create',
			templateUrl: 'modules/followups/views/create-followup.client.view.html'
		}).
		state('viewFollowup', {
			url: '/followups/:followupId',
			templateUrl: 'modules/followups/views/view-followup.client.view.html'
		}).
		state('editFollowup', {
			url: '/followups/:followupId/edit',
			templateUrl: 'modules/followups/views/edit-followup.client.view.html'
		});
	}
]);