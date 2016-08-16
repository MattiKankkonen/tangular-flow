'use strict';

angular.module('imagePost')
.component('imagePost', {
  templateUrl: 'image-post/image-post.template.html',
  controller: ['$http', function ImagePostController($http) {
    var self = this;
    self.imageCaption = "If you upload a picture it comes here";
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
