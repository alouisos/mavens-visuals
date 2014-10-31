'use strict';

// Configuring the Articles module
angular.module('queries').run(['Menus',
	function(Menus) {
		// Set top bar menu items
		Menus.addMenuItem('topbar', 'Trials', 'queries', 'dropdown', '/queries(/create)?');
		Menus.addSubMenuItem('topbar', 'queries', 'List Trials', 'queries');
		Menus.addSubMenuItem('topbar', 'queries', 'New Trial', 'queries/create');
	}
]);