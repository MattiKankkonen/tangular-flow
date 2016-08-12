'use strict';

describe('core.tensorflow', function() {

  beforeEach(module('core.tensorflow'));
  describe('TensorflowController', function() {
    var $scope;
    var Tensorflow;
    
    beforeEach(inject( function($rootScope, $controller, _Tensorflow_) {
      $scope = $rootScope.$new();
      $controller('TensorflowController', {$scope: $scope});
      Tensorflow = _Tensorflow_;
    }));

    it('Shown server address should match the one from service', 
      function() {
        var server = Tensorflow.getServer();
        jasmine.addCustomEqualityTester(angular.equals);
        expect($scope.serverUrl).toEqual(server);
    }); 
  }); 
});
