var key= 'fmV1NTKGaKc6wG8hQxZskPq3r3oyeQFuIIf8cobR'
var app = angular.module('noiseyApp', [])
    .controller("noiseyController", function($scope, $http){
      var request = {
        method: 'GET',
        url: 'https://freesound.org/apiv2/search/text',
        headers : {
          'Authorization': 'token '+ key,
          'query': 'funny'
        }
      }
      $http({method: 'GET', url:"https://freesound.org/apiv2/search/text/?query=funny&token=fmV1NTKGaKc6wG8hQxZskPq3r3oyeQFuIIf8cobR"}).then(function(data){
        $http({
          method: 'GET',
          url: 'https://freesound.org/apiv2/sounds/'+data.data.results[0].id + '/',
          headers:{
            'Authorization': 'token '+ key
          }
        }).then(function(data){
          console.log(data.data.previews)
        })
        console.log(data.data.results[0]);
      })

      // My App Goes Here
      $scope.title = "myTitle is here!"
    })
