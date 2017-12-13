app.controller("noiseyController", function($scope, $http, audioService, pubnub, playerService){
  var topics = ['funny', 'goofy', 'silly', 'cartoon', 'cinematic', 'effect'];
  var id_list;

  $scope.users = [];
  $scope.listUsers = ()=>{
    console.log($scope.users);
  }
  var registerUsers = ()=>{
    var accept_users = true;
    pubnub.connect($scope.code, (message)=>{
      playerService.register(accept_users, message, user=>{
        console.log(user);
        $scope.users.push(user);
        $scope.$apply('users');
      })
    })
  }

  $scope.session = {
    begin: function(){
      var leader = Math.floor(Math.random()*$scope.users.length);
      $scope.users[leader].state = "leading"
      var message = {
        username: $scope.users[leader].username,
        sessionUpdate: true,
        state: "leading"
      }
      pubnub.send($scope.code, message, res=>{
        console.log(res);
      });
      for(u in $scope.users){
        if(u != leader){
          $scope.returnSong(response=>{
            console.log(response);
            var message = {
              username: $scope.users[u].username,
              sessionUpdate: true,
              state: "playing",
              songs: response
            }
            pubnub.send($scope.code, message, res=>{
              console.log(res);
            })
          })
        }
      }
    }
  }
//
//   $$hashKey
// :
// "object:5"
// colour
// :
// "#02FF60"
// icon
// :
// "fa-bomb"
// score
// :
// 0
// state
// :
// "playing"
// username
// :
// "User"


  audioService.generate_list(topics, (res)=>{
    id_list = res;
  });
  $scope.returnList = function(){
    console.log(id_list[Math.floor(Math.random()*id_list.length)]);
  }
  $scope.returnSong = function(callback){
    var listed_songs = []
    for(var i = 0;i<7;i++){
      id = id_list[Math.floor(Math.random()*id_list.length)];
      audioService.get_song(id, (res)=>{
        listed_songs.push(res);
      });
    }
    callback(listed_songs);
  }
  var state = 0;
  $scope.state = {
    step:()=>{
        if(state == 0){
          registerUsers();
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
  $scope.code = "Bv0D"
})

//
