app.controller("noiseyController", function($scope, $http, audioService, pubnub, playerService){


  $scope.enter = (code, username)=>{
    if(!code){
      window.alert("Code Required to enter. ")
    } else {
      if(!username){
        window.alert("Please enter a Username. ")
      } else {
        $scope.user.channel = code;
        $scope.user.username = username;
        var message = {
          username: username,
          user: true
        }
        $scope.user.register(code, message);
      }
    }
  }
  $scope.round = {
    songs: ['Song 1', 'Monkeybones', 'THis is a song too', 'Holy Fucknuts'],
    topic: 'This is a topic you can choose a sound for.',
    choose: (username, channel, song)=>{
      console.log(username);
      console.log(channel);
      console.log(song);
    }
  }

  $scope.user = {
    channel: '',
    username: '',
    icon: 'fa-beer',
    register: (code, username)=>{
      $scope.state.step();
      pubnub.send(code, username, (response)=>{
        console.log(response);
      });
    }
  }
  pubnub.connect($scope.user.channel, message=>{
    // this is the logic im gonna use for the user.
  })
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
