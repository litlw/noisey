app.factory("audioService", function($http){
  var key = "fmV1NTKGaKc6wG8hQxZskPq3r3oyeQFuIIf8cobR";
  return {
    generate_list: (topics, response)=>{
      var id_list = [];
      if(response){
        if(topics){
          for(i in topics){
            $http({
              method: 'GET', url:"https://freesound.org/apiv2/search/text/?query="+topics[i]+"&token=fmV1NTKGaKc6wG8hQxZskPq3r3oyeQFuIIf8cobR"
            }).then(function(data){
              for(k in data.data.results){
                id_list.push(data.data.results[k].id);
              }
            });
          }
          response(id_list)
        } else {response("Error. No list provided");}
      }
    },
    get_song: (id, response)=>{
      if(response){
        $http({
          method: 'GET',
          url: 'https://freesound.org/apiv2/sounds/'+ id + '/',
          headers:{
            'Authorization': 'token '+ key
          }
        }).then(function(data){
          if(!data){
            response("There was an error with the request.")
          }
          response({
            name: data.data.name,
            url: data.data.previews['preview-lq-mp3']
          });
        });
      }
    }
  }
})
