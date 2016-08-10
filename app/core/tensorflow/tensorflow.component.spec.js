'use strict';

describe('core.tensorflow', function() {

	beforeEach(module('core.tensorflow'));

	it('YOU NEED TO FIX ME', function() {
			expect(true).not.toEqual(true);
	});
	describe('TensorflowController', function() {
		var ctrl;
		var Tensorflow;
		
		beforeEach(inject( function($componentController, _Tensorflow_) {
			ctrl = $componentController('core.tensorflow');
			Tensorflow = _Tensorflow_;
		}));


/*
		it('Server address should be correct', 
			function() {
				var server = Tensorflow.getServer();
				jasmine.addCustomEqualityTester(angular.equals);
				expect(ctrl.serverAddress).toEqual(server);
		}); */
	}); 
});
