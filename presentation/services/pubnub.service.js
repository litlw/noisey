app.factory('pubnub', function() {
  var pubnub;
  var creds = {
    pubKey: 'pub-c-46004153-6eb2-4bf6-aedd-163660eb6fc5', // my key
    subKey: 'sub-c-e6f1e7a4-bfd3-11e7-930d-6a99ed520776' // my key
  }
  // i am refactoring code from my GeoPresentation repo
  // Initialize the PubNub API connection.

  return {
    connect: (channel, callback) => {
      if (channel) {
        pubnub = new PubNub({
          // use your own keys
          publishKey: creds.pubKey,
          subscribeKey: creds.subKey
        })
        console.log(pubnub);
        pubnub.addListener({
          status: function(statusEvent) {
            if (statusEvent.category === "PNConnectedCategory") {
              var newState = {
                new: 'connected'
              };
              pubnub.setState({
                  state: newState
                },
                function(status) {
                  // handle state setting response
                  // to being cnnected
                  console.log("I am connected to " + channel);
                }
              );
            }
          },
          message: function(msg) {
            console.log(msg);
            if (callback) {
              callback(msg.message);
            } else {
              console.log(msg.message);
            }
          }
        });
        pubnub.subscribe({
          //subscribe to channels
          channels: [channel]
        });
      };
    },
    send: function(channel, data, arr, callback) {
      if (data) {
        if (callback) {
          pubnub.publish({
              message: {
                text: data,
                objects: arr
              },
              channel: channel
            },
            function(status, response) {
              if (status.error) {
                // handle error
                console.log(status)
              } else {
                console.log(response);
                callback("message Published w/ timetoken", response)
              }
            }
          );
        }
      }
    }

  }
})
