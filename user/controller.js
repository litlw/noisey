app.controller("noiseyController", function($scope, $http, audioService, pubnub){

  $scope.returnSong = function(){
    used_id = []
    listed_songs = []
    for(var i = 0;i<7;i++){
      id = id_list[Math.floor(Math.random()*id_list.length)];
      console.log("my if worked");
      audioService.get_song(id, (res)=>{
        listed_songs.push(res);
      });
      used_id.push(id);
    }
    return(listed_songs);
  }
  var state = 0;
  $scope.enter = (code, username)=>{
    if(!code){
      window.alert("Code Required to enter. ")
    }else{
      if(!username){
        window.alert("Please enter a Username. ")
      }else{
        $scope.state.step();
        pubnub.connect(code)
        pubnub.message(code, username, (response)=>{
          console.log(response);
        });
      }
    }
  }

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

  // My App Goes Here
  // $scope.code = "Bv0D"
})

//
