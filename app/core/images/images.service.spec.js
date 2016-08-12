'use strict';

describe('Images', function() {
  var $httpBackend;
  var Images;
  var imageData = [
    {"id": 0, "url": "http://siutou.dlinkddns.com/site/img.jpg",  "caption": "This is the latest uploaded by mobile app", "linkText": "" },
    {"id": 1, "url": "http://siutou.dlinkddns.com/site/img2.jpg", "caption": "This looks like number 2", "linkText": "" }
  ];

  beforeEach(function() {
    jasmine.addCustomEqualityTester(angular.equals);
  });
  beforeEach(module('core.images'));

  beforeEach(inject(function(_$httpBackend_, _Images_) {
    $httpBackend = _$httpBackend_;
    $httpBackend.expectGET('core/images/imagelist.json').respond(imageData);
    Images = _Images_;
  }));

  afterEach(function() {
    $httpBackend.verifyNoOutstandingExpectation();
    $httpBackend.verifyNoOutstandingRequest();
  });
    
  it('Should fetch the image data from core/images/imagelist.json',
    function() {
        var images = Images.query();
        expect(images).toEqual([]);
        $httpBackend.flush();
        expect(images).toEqual(imageData);
    });
});
