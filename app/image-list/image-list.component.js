angular.module('imageList')
.component('imageList', {
	templateUrl: 'image-list/image-list.template.html',
	controller: ['Tensorflow', 
	function ImageListController(Tensorflow) {
			var self = this;
			self.images = [
  	    {id: 0, url: "http://siutou.dlinkddns.com/site/img.jpg", caption: "This is the latest uploaded by mobile app", linkText: '' },
  	    {id: 1, url: "http://siutou.dlinkddns.com/site/img2.jpg", caption: "This looks like number 2", linkText: '' },
  	    {id: 2, url: "http://siutou.dlinkddns.com/site/img3.jpg", caption: "This should be 3", linkText: '' },
  	    {id: 3, url: "http://siutou.dlinkddns.com/site/img4.jpg", caption: "If I'm not mistaken it's 4", linkText: '' },
  	    {id: 4, url: "http://siutou.dlinkddns.com/site/img6.jpg", caption: "6 I think", linkText: '' },
  	    {id: 5, url: "http://siutou.dlinkddns.com/site/img8.jpg", caption: "Infinity or 8", linkText: '' },
  	    {id: 6, url: "http://siutou.dlinkddns.com/site/img9.jpg", caption: "Could be 9", linkText: '' }
  	  ];
  	 
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
