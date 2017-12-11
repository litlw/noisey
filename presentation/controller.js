app.controller("noiseyController", function($scope, $http, audioService){
  var topics = ['funny', 'goofy', 'silly', 'cartoon', 'cinematic', 'effect'];
  var id_list;
  audioService.generate_list(topics, (res)=>{
    id_list = res;
  });
  $scope.returnList = function(){
    console.log(id_list[Math.floor(Math.random()*id_list.length)]);
  }
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

  // My App Goes Here
  $scope.title = "myTitle is here!"
})

//
