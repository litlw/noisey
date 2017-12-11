app.directive("splashDirective", function() {
    return {
      scope: {
        "state": "="
      },
      templateUrl : "directives/splash.template.html",
      link: function($scope){
        $scope.click = function(){
          $scope.state.step();
     }
   }
    };
});
