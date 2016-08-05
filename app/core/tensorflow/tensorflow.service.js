angular.module('core.tensorflow')
.factory('Tensorflow', ['$resource',
	function($resource) {
		return $resource('http://tensorshow.herokuapp.com/?json=:json&imgurl=:imgurl', 
			{json: 'yes'}, 
			{query: {
				method: 'GET',
				params: {imgurl: 'imgurl'},
				isArray: true
			}
		});
	}
]);
