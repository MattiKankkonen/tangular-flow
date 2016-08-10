'use strict';

angular.module('core.tensorflow')
.controller('TensorflowController', ['$scope','Tensorflow',
	function TensorflowController($scope, Tensorflow) {
			$scope.serverAddress = Tensorflow.getServer();
		}]);
