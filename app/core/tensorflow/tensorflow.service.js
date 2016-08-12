'use strict';

angular.module('core.tensorflow')
.factory('Tensorflow', ['$resource',
  function($resource) {
    var self = this;
    self.serverAddress = "http://tensorshow.herokuapp.com";
    
    return {
      getServer: function getServer() {
        return self.serverAddress;
      },
      setServer: function setServer(server) {
        self.serverAddress = server;
      }, 
      getResource: function () { 
        var server = self.serverAddress;
        return $resource(server +'/?json=:json&imgurl=:imgurl', 
        {json: 'yes'}, 
        {query: {
          method: 'GET',
          params: {imgurl: 'imgurl'},
          isArray: false
          }
        });
      }
    }
  }
]);
