'use strict';

(function() {
	// Followups Controller Spec
	describe('Followups Controller Tests', function() {
		// Initialize global variables
		var FollowupsController,
		scope,
		$httpBackend,
		$stateParams,
		$location;

		// The $resource service augments the response object with methods for updating and deleting the resource.
		// If we were to use the standard toEqual matcher, our tests would fail because the test values would not match
		// the responses exactly. To solve the problem, we define a new toEqualData Jasmine matcher.
		// When the toEqualData matcher compares two objects, it takes only object properties into
		// account and ignores methods.
		beforeEach(function() {
			jasmine.addMatchers({
				toEqualData: function(util, customEqualityTesters) {
					return {
						compare: function(actual, expected) {
							return {
								pass: angular.equals(actual, expected)
							};
						}
					};
				}
			});
		});

		// Then we can start by loading the main application module
		beforeEach(module(ApplicationConfiguration.applicationModuleName));

		// The injector ignores leading and trailing underscores here (i.e. _$httpBackend_).
		// This allows us to inject a service but then attach it to a variable
		// with the same name as the service.
		beforeEach(inject(function($controller, $rootScope, _$location_, _$stateParams_, _$httpBackend_) {
			// Set a new global scope
			scope = $rootScope.$new();

			// Point global variables to injected services
			$stateParams = _$stateParams_;
			$httpBackend = _$httpBackend_;
			$location = _$location_;

			// Initialize the Followups controller.
			FollowupsController = $controller('FollowupsController', {
				$scope: scope
			});
		}));

		it('$scope.find() should create an array with at least one Followup object fetched from XHR', inject(function(Followups) {
			// Create sample Followup using the Followups service
			var sampleFollowup = new Followups({
				name: 'New Followup'
			});

			// Create a sample Followups array that includes the new Followup
			var sampleFollowups = [sampleFollowup];

			// Set GET response
			$httpBackend.expectGET('followups').respond(sampleFollowups);

			// Run controller functionality
			scope.find();
			$httpBackend.flush();

			// Test scope value
			expect(scope.followups).toEqualData(sampleFollowups);
		}));

		it('$scope.findOne() should create an array with one Followup object fetched from XHR using a followupId URL parameter', inject(function(Followups) {
			// Define a sample Followup object
			var sampleFollowup = new Followups({
				name: 'New Followup'
			});

			// Set the URL parameter
			$stateParams.followupId = '525a8422f6d0f87f0e407a33';

			// Set GET response
			$httpBackend.expectGET(/followups\/([0-9a-fA-F]{24})$/).respond(sampleFollowup);

			// Run controller functionality
			scope.findOne();
			$httpBackend.flush();

			// Test scope value
			expect(scope.followup).toEqualData(sampleFollowup);
		}));

		it('$scope.create() with valid form data should send a POST request with the form input values and then locate to new object URL', inject(function(Followups) {
			// Create a sample Followup object
			var sampleFollowupPostData = new Followups({
				name: 'New Followup'
			});

			// Create a sample Followup response
			var sampleFollowupResponse = new Followups({
				_id: '525cf20451979dea2c000001',
				name: 'New Followup'
			});

			// Fixture mock form input values
			scope.name = 'New Followup';

			// Set POST response
			$httpBackend.expectPOST('followups', sampleFollowupPostData).respond(sampleFollowupResponse);

			// Run controller functionality
			scope.create();
			$httpBackend.flush();

			// Test form inputs are reset
			expect(scope.name).toEqual('');

			// Test URL redirection after the Followup was created
			expect($location.path()).toBe('/followups/' + sampleFollowupResponse._id);
		}));

		it('$scope.update() should update a valid Followup', inject(function(Followups) {
			// Define a sample Followup put data
			var sampleFollowupPutData = new Followups({
				_id: '525cf20451979dea2c000001',
				name: 'New Followup'
			});

			// Mock Followup in scope
			scope.followup = sampleFollowupPutData;

			// Set PUT response
			$httpBackend.expectPUT(/followups\/([0-9a-fA-F]{24})$/).respond();

			// Run controller functionality
			scope.update();
			$httpBackend.flush();

			// Test URL location to new object
			expect($location.path()).toBe('/followups/' + sampleFollowupPutData._id);
		}));

		it('$scope.remove() should send a DELETE request with a valid followupId and remove the Followup from the scope', inject(function(Followups) {
			// Create new Followup object
			var sampleFollowup = new Followups({
				_id: '525a8422f6d0f87f0e407a33'
			});

			// Create new Followups array and include the Followup
			scope.followups = [sampleFollowup];

			// Set expected DELETE response
			$httpBackend.expectDELETE(/followups\/([0-9a-fA-F]{24})$/).respond(204);

			// Run controller functionality
			scope.remove(sampleFollowup);
			$httpBackend.flush();

			// Test array after successful delete
			expect(scope.followups.length).toBe(0);
		}));
	});
}());