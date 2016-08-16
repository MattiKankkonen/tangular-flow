'use strict';

angular.module('imagePost')
.component('imagePost', {
  templateUrl: 'image-post/image-post.template.html',
  controller: ['$http', 'Tensorflow', function ImagePostController($http, Tensorflow) {
    var self = this;
    self.imageCaption = "If you upload a picture it comes here";
    self.analysis = '';
    self.http = $http;

    self.postImage = function(uploadFile) {
      self.imageCaption ="Now posting picture " + uploadFile.name;
      var fd = new FormData();
      fd.append('fileName', uploadFile);
      self.http.post('/imgsrv', fd, {
        transformRequest: angular.identity,
        headers: {'Content-Type': undefined }
      })
      .success(function() {
        self.imageCaption = 'Here is the uploaded image';
        self.imageUrl = '/images/img.jpg?random=' + Date.now();
        self.analysis = 'Uploading your image to TensorFlow engine... please wait for results';
        // TODO: should we prevent caching also here with ?random= !!!
        // TODO: the image URL host part obviously needs to be something else i.e. resolve the host name
        self.data = Tensorflow.getResource().
          get({imgurl: 'http://localhost:3000/images/img.jpg'}, function(data) {
          if(data.status === "valid") {
            self.analysis = "TensorFlow says this is " + 
            data.result + " with probability of " +
            data.probability;
            } else {
              self.analysis = "Failed to analyse picture";
            }
          }, function () {
            self.analysis = "Networking error with TensorFlow engine";
          }
        );
      })
      .error(function() {
        self.imageCaption = 'Upload failed';
      });
    }
  }]
})
.directive('fileModel', ['$parse', function($parse) {
  return {
    restrict: 'A',
    link: function(scope, element, attrs) {
      var model = $parse(attrs.fileModel);
      var modelSetter = model.assign;
      
      element.bind('change', function() {
        scope.$apply(function() {
          modelSetter(scope, element[0].files[0]);
        });
      });
    }
  };
}]);
