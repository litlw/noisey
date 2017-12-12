app.factory('playerService', function(pubnub, audioService) {
  player_avatars = ['fa-superpowers', 'fa-telegram', 'fa-shower', 'fa-beer', 'fa-bolt', 'fa-bomb', 'fa-coffee', 'fa-child', 'fa-diamond', 'fa-fire'];
  player_colors = ['#FF1C0D', '#E80C49', '#FF00C6', '#C70CE8', '#980DFF', '#0288FF', '#02B8E8', '#0BFFF0', '#02E899', '#02FF60'];
  return {
    // some functions
    register: (message, callback) => {
      // message should be like this:
      // message = {
      //   username: '',
      //   icon: '',
      //   colour: '',
      //   score: 0,
      //   pos: #
      // }
      if (message.username && message.pos) {
        if (callback) {
          callback(message);
          // use the resulting message to make a user.
        }
      }
      // there is no else. There will be other messages.
    },
    get_state: (message, callback) => {
      if (message.username && message.state) {
        if (callback) {
          callback(message);
        }
      }
    },
    player: {
      get_songs: (message, callback) => {
        if (message.username && message.songs) {
          if (callback) {
            var res = [message.topic]
            for (s in songs) {
              audioService.get_song(songs[s], song => {
                res.push(song);
              })
            }
            callback(res);
          }
        }
      }, send_song: (username, song, code) => {
        // this one uses pubnub.send()
        let message = {
          'username': username,
          'song': song
        };
        pubnub.send(message, code, res=>{
          console.log(res);
        });
      }, win: (message, username, callback) =>{
        if (message == username){
          callback(10); // send 10 points to be added to the player.
        } else {
          callback(message);
        }
      }
    },
    judge: {
      get_songs: (message, callback)=>{
        if(message.length > 2){
          if(callback){
            var songs;
            for(m in message){
              audioService.get_song(message[m].song, song => {
                songs.push({
                  'username': message[m].username,
                  'song': song
                });
              })
            };
            callback(songs);
          }
        }
      }, choose_song: (username, song, code, callback)=>{
        // this one uses pubnub.send();
        let message = {
          'username': username,
          'song': song
        };
        pubnub.send(message, code, res=>{
          console.log(res);
        })
      }
    }
  }
})
