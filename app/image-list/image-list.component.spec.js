'use strict';

describe('imageList', function() {

	beforeEach(module('imageList'));

	describe('ImageListController', function() {
		var ctrl;
		var $httpBackend;
		var imageData = [
			{"id": 0, "url": "img.jpg",  "caption": "This is the latest uploaded by mobile app", "linkText": "" },
			{"id": 1, "url": "img2.jpg", "caption": "This looks like number 2", "linkText": "" }
		];

		var analysis = 
		{ 
			url: "http://siutou.dlinkddns.com/site/img.jpg", 
			status: "valid", 
			probability: 0.99999999,
			result: 1
		};
		/*var Tensorflow;
		var Images;*/
		
		beforeEach(inject( function($componentController, _$httpBackend_) {
			ctrl = $componentController('imageList');
			$httpBackend = _$httpBackend_;
			jasmine.addCustomEqualityTester(angular.equals);
			$httpBackend.expectGET('core/images/imagelist.json').respond(imageData);
			/*Tensorflow = _Tensorflow_;
			Images = _Images_; */
		}));

		afterEach(function() {
			$httpBackend.verifyNoOutstandingExpectation();
			$httpBackend.verifyNoOutstandingRequest();
		});
	
		it('image list should match the server data', 
			function() {
				expect(ctrl.images).not.toEqual(imageData);
				$httpBackend.flush();
				expect(ctrl.images).toEqual(imageData);
		});
		it('successful analysis', 
			function() {
				// First we need to fetch the image list
				$httpBackend.flush();

				// Then prepare for analysis reqeust
				$httpBackend.
				expectGET('http://tensorshow.herokuapp.com/?json=yes&imgurl=img.jpg').
				respond(analysis);
				
				// The analysis request and examining the results
				ctrl.analysePicture(ctrl.images[0]);
				expect(ctrl.images[0].linkText).toEqual('Picture sent for analysis...');
				
				$httpBackend.flush();

				expect(ctrl.data.status).toEqual(analysis.status);
				expect(ctrl.data.probability).toEqual(analysis.probability);
				expect(ctrl.data.result).toEqual(analysis.result);

				expect(ctrl.images[0].caption).toEqual('Tensor flow says this is '+
					analysis.result + ' with probability of '+
					analysis.probability);

				expect(ctrl.images[0].linkText).toEqual('The result can be seen above');
				//console.log(ctrl.images[0].caption);
		});

		it('unsuccessful analysis', 
			function() {
				// First we need to fetch the image list
				$httpBackend.flush();

				// Then prepare for analysis reqeust
				$httpBackend.
				expectGET('http://tensorshow.herokuapp.com/?json=yes&imgurl=img.jpg').
				respond({status: "invalid"});
				
				// The analysis request and examining the results
				ctrl.analysePicture(ctrl.images[0]);
				expect(ctrl.images[0].linkText).toEqual('Picture sent for analysis...');
				
				$httpBackend.flush();

				expect(ctrl.data.status).toEqual("invalid");
				
				expect(ctrl.images[0].caption).toEqual('Failed to analyse the picture');

				expect(ctrl.images[0].linkText).toEqual('The result is above');
				//console.log(ctrl.images[0].caption);
		});
	}); 
});
