app.directive("gameDirective", function() {
    return {
      scope: {
        "state": "="
      },
      templateUrl : "directives/game.template.html",
      link: function($scope){
        $scope.click = function(){
          $scope.state(true);
     }
   }
    };
});
