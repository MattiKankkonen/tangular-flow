'use strict';

describe('Tensorflow', function() {
  var $httpBackend;
  var Tensorflow;
  var analysis = 
  { 
    url: "http://siutou.dlinkddns.com/site/img.jpg", 
    status: "valid", 
    probability: 0.99999999,
    result: 1
  };

  beforeEach(function() {
    jasmine.addCustomEqualityTester(angular.equals);
  });
  beforeEach(module('core.tensorflow'));

  describe('Network functionality', function() {
    beforeEach(inject(function(_$httpBackend_, _Tensorflow_) {
      $httpBackend = _$httpBackend_;
      $httpBackend.expectGET('http://tensorserver/?json=yes&imgurl=img1.jpg').respond(analysis);
      Tensorflow = _Tensorflow_;
    }));

    afterEach(function() {
      $httpBackend.verifyNoOutstandingExpectation();
      $httpBackend.verifyNoOutstandingRequest();
    });
    
    it('Should fetch the image analysis from Tensorflow engine',
      function() {
        Tensorflow.setServer('http://tensorserver');
        var result = Tensorflow.getResource().get({imgurl: 'img1.jpg'});
        expect(result).not.toEqual(analysis);
        $httpBackend.flush();
        expect(result).toEqual(analysis);
      });
  });

  it('Check the server address set/get for Tensorflow engine', 
    function() {
      Tensorflow.setServer('http://hellos');
      var server = Tensorflow.getServer();
      expect(server).toEqual('http://hellos');
    }
  );
});
