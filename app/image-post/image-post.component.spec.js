'use strict';

describe('imagePost', function() {
  beforeEach(module('imagePost'));
  describe('ImagePostController', function() {
    var ctrl;
    var $httpBackend;
    var analysisResult =
    { 
      url: "http://siutou.dlinkddns.com/site/img.jpg", 
      status: "valid", 
      probability: 0.99999999,
      result: 1
    };
    var uploadFile = 
    {
      name: "test.img"
    };

    beforeEach(inject(function($componentController, _$httpBackend_) {
      ctrl = $componentController('imagePost');
      $httpBackend = _$httpBackend_;
      jasmine.addCustomEqualityTester(angular.equals);
    }));

    afterEach(function() {
     $httpBackend.verifyNoOutstandingExpectation();
     $httpBackend.verifyNoOutstandingRequest();
    });

    it('should go the happy path',
      function() {
        // First check initial values
        expect(ctrl.imageCaption).toEqual('If you upload a picture it comes here');
        expect(ctrl.analysis).toEqual('');

        // The image has been chosen with the form and upload button clicked
        ctrl.postImage(uploadFile);
        expect(ctrl.imageCaption).toEqual('Now posting picture ' + uploadFile.name);
        
        $httpBackend.expectPOST('/imgsrv').respond(200);
        
        /* We can't catch the moment between POST and GET because from httpBackend point of view
         * they seem to be in practise simultaneous, hence the order of expect and flush
         * So also because of this the commented out section below can't be tested currently
         */
        //expect(ctrl.imageCaption).toEqual('Here is the uploaded image');
        //$httpBackend.flush();
        //expect(ctrl.analysis).toEqual('Uploading your image to TensorFlow engine... please wait for results');

        // Fetch the analysis from the TensorFlow engine
        $httpBackend.expectGET(/images[%2F/]*img.jpg/).respond(analysisResult);
        $httpBackend.flush();
        expect(ctrl.imageCaption).toEqual('Here is the uploaded image');
        expect(ctrl.analysis).toEqual('TensorFlow says this is ' +
          analysisResult.result + ' with probability of ' + analysisResult.probability);
      });

    it('should fail with the image upload',
        function() {
        // The image has been chosen with the form and upload button clicked
        ctrl.postImage(uploadFile);
        expect(ctrl.imageCaption).toEqual('Now posting picture ' + uploadFile.name);
        $httpBackend.expectPOST('/imgsrv').respond(404);
        $httpBackend.flush();
        expect(ctrl.imageCaption).toEqual('Upload failed');
        expect(ctrl.analysis).toEqual('Upload failed');  
      });

    it('should fail with the TensorFlow engine network error',
      function() {
        ctrl.postImage(uploadFile);
        expect(ctrl.imageCaption).toEqual('Now posting picture ' + uploadFile.name);
        $httpBackend.expectPOST('/imgsrv').respond(200);
        $httpBackend.expectGET(/images[%2F/]*img.jpg/).respond(404);
        $httpBackend.flush();
        expect(ctrl.analysis).toEqual('Networking error with TensorFlow engine');  
      });

    it('should fail with the TensorFlow engine internal error',
      function() {
        ctrl.postImage(uploadFile);
        expect(ctrl.imageCaption).toEqual('Now posting picture ' + uploadFile.name);
        $httpBackend.expectPOST('/imgsrv').respond(200);
        $httpBackend.expectGET(/images[%2F/]*img.jpg/).respond({status:"invalid"});
        $httpBackend.flush();
        expect(ctrl.analysis).toEqual('Failed to analyse picture');  
      });
  });
});
