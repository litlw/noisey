app.factory('stateFactory', ()=>{
  // this function manages the state of the page
  var state;
  return {
    step:()=>{
      if(state == 0){
        state = 1;
      }else if(state == 1){
        state = 2;
      } else if(state == 2){
        state = 3;
      } else {
        state == 0;
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
    },
  }
})
