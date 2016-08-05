angular.module('imageList')
.component('imageList', {
	templateUrl: 'image-list/image-list.template.html',
	controller: ['Tensorflow','Images', 
	function ImageListController(Tensorflow, Images) {
			var self = this;
			self.images = Images.query();
  	 
  	  self.analysePicture = function analysePicture(image) {
  	  	console.log('Analyse ' + image.url);
  	  	image.linkText = "Picture sent for analysis...";
  	  	self.data = Tensorflow.get({imgurl: image.url }, function(data) {
  	  		console.log(data);
  	  		if(data.status === "valid") {
  	  			image.caption = "Tensor flow says this is " + 
  	  			data.result + " with probability of " +
  	  			data.probability;
  	  		} else {
  	  			image.caption ="Failed to analyse the picture";
  	  		}
  	  		image.linkText = 'The result is above';
  	  	});
  	  }
		}
	]
});
