'use strict';

angular.module('imageList')
.component('imageList', {
  templateUrl: 'image-list/image-list.template.html',
  controller: ['Tensorflow','Images', 
  function ImageListController(Tensorflow, Images) {
    var self = this;
    self.images = Images.query();
     
    self.analysePicture = function analysePicture(image) {
      
      image.linkText = "Picture has been sent for analysis...";
        self.data = Tensorflow.getResource().get({imgurl: image.url }, function(data) {
  
        if(data.status === "valid") {
          image.caption = "Tensor flow says this is " + 
          data.result + " with probability of " +
          data.probability;
        } else {
          // TensorFLow server returned error status
          image.caption ="Failed to analyse the picture";
        }
        image.linkText = 'The result can be seen above';
      }, function() {
        // Something went wrong with the request networking wise
        image.caption ="Failed to analyse the picture";
        image.linkText = 'The result can be seen above';
      });
    }
  }]
});
