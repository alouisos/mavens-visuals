'use strict';

// Followups controller
angular.module('followups').filter('toArray', function(){
                        return function(obj) {
                          var result = [];
                          angular.forEach(obj, function(val, key) {
                            result.push(val);
                          });
                          return result;};
                      })
.controller('FollowupsController', ['$scope', '$stateParams', '$location', 'Authentication', 'Followups',
	function($scope, $stateParams, $location, Authentication, Followups ) {
		$scope.authentication = Authentication;

		// Create new Followup
		$scope.create = function() {
			// Create new Followup object
			var followup = new Followups ({
				name: this.name, 
				days_from_baseline: this.days_from_baseline,
				trial:  $stateParams.queryId


			});
			// Redirect after save
			followup.$save(function(response) {
				$location.path('queries/' + $stateParams.queryId);

				// Clear form fields
				$scope.name = '';
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Remove existing Followup
		$scope.remove = function( followup ) {
			if ( followup ) { followup.$remove();

				for (var i in $scope.followups ) {
					if ($scope.followups [i] === followup ) {
						$scope.followups.splice(i, 1);
					}
				}
			} else {
				$scope.followup.$remove(function() {
					$location.path('followups');
				});
			}
		};

		// Update existing Followup
		$scope.update = function() {
			var followup = $scope.followup ;

			followup.$update(function() {
				$location.path('followups/' + followup._id);
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Find a list of Followups
		$scope.find = function() {
			$scope.followups = Followups.query();
		};

		// Find existing Followup
		$scope.findOne = function() {
			$scope.followup = Followups.get({ 
				followupId: $stateParams.followupId
			});
		};
	}
]);