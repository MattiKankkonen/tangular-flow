angular.module('core.images')
.factory('Images', ['$resource',
	function($resource) {
		return $resource('core/images/imagelist.json', 
			{}, 
			{query: {
				method: 'GET',
				isArray: true
			}
		});
	}
]);
