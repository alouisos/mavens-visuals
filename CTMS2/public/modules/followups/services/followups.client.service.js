'use strict';

//Followups service used to communicate Followups REST endpoints
angular.module('followups').factory('Followups', ['$resource',
	function($resource) {
		return $resource('followups/:followupId', { followupId: '@_id'
		}, {
			update: {
				method: 'PUT'
			}
		});
	}
]);