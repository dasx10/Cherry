export default {
    del(state,i){
        state.locations.splice(i,1);
    },

    set(state,ind){
        if(ind.index!==false){
            state.location = state.locations[ind.index];
            state.location['index']=ind.index;
        }else{
            state.location.index=null;
            state.location.id_airport=null;
            state.location.airport_name='';
            state.location.address='';
            state.location.longitude=0;
            state.location.latitude=0;
            state.location.one_night_cost=null;
        }
        this.$router.push('/loc/map');
    },

    editLocation(state,data){
        state.locations[data.id_airport] = data;
        this.$router.push('/loc');
    },

    setLocations(state,data){
        state.upload=false;
        state.locations=[];
        for(let i=0;i<data.length;i++){
            state.locations[data[i].id_airport]=data[i];
        }
        state.upload=true;
    },

    startUploadSingle(state){
        state.errMsg = '';
        state.singlUpload=true;
    },
  
    endUploadSingle(state){
        state.singlUpload=false;
    }
}