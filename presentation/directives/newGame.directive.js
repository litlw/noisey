app.directive("newGameDirective", function() {
    return {
      scope: {
        "player": "="
      },
      templateUrl : "directives/newGame.template.html",
      link: function($scope){
        $scope.click = function(){
          $scope.state(true);
     }
   }
    };
});
