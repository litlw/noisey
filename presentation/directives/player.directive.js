app.directive("playerDirective", function() {
    return {
      scope: {
        "player": "="
      },
      templateUrl : "directives/player.template.html",
      link: function($scope){
        $scope.click = function(){
          $scope.state(true);
     }
   }
    };
});
