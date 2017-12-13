app.factory('playerService', function(pubnub){
  var player_avatars = ['fa-superpowers', 'fa-telegram', 'fa-shower', 'fa-beer', 'fa-bolt', 'fa-bomb', 'fa-coffee', 'fa-child', 'fa-diamond', 'fa-fire'];
  var player_colours = ['#FF1C0D', '#E80C49', '#FF00C6', '#C70CE8', '#980DFF', '#0288FF', '#02B8E8', '#0BFFF0', '#02E899', '#02FF60'];
  return{
    register: (accept_users, message, callback)=>{
      console.log('registering');
      // message should just be text: username.
      if(accept_users){
        console.log('accepted');
        // if the game is looking for new users.
        if(message.text.user){
          console.log('user');
          // if the User token is in the message.
          user = {
            username: message.text.username,
            icon: player_avatars[Math.floor(Math.random()*player_avatars.length)],
            colour: player_colours[Math.floor(Math.random()*player_colours.length)],
            score: 0,
            state: "playing"
          }
          callback(user);
        }
      }
    }
  }
})
