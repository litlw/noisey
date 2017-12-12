const app = angular.module("noiseyApp", [])
app.controller('noiseyController', function(){
  // yikes
  var state = 0;
  $scope.state = {
    step:()=>{
        if(state == 0){
          pubnub.connect($scope.code, ()=>{
            console.log("connected!");
            // nothing happens here.
          })
          state = 1;
        }else if(state == 1){
          state = 2;
        } else if(state == 2){
          state = 3;
        } else {
          state = 0;
        }
    }, splash: ()=>{

      if(state == 0){
        return true;
      } else {
        return false;
      }

    }, one: ()=>{
      if(state == 1){
        return(true);
      } else {
        return(false);
      }
    }, two: ()=>{
      if(state == 2){
        return(true);
      } else {
        return(false);
      }
    }, three: ()=>{
      if(state == 3){
        return(true);
      } else {
        return(false);
      }
    }
  }
})
