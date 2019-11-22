export default {
    async getLoction(ctx){
        const AuthStr = await 'Bearer '+ctx.rootState.Users.user.token;
        this.$axios.get("/airport_list", { headers: { Authorization: AuthStr} })
         .then(res => {
             ctx.commit('setLocations',res.data.data.airport_list);
          })
         .catch((err) => {
             console.log('error ' + err);
          });
    },

    async addLocation(ctx, location){
        ctx.commit('startUploadSingle');
        if(localStorage.locationSend != JSON.stringify(location)){
            localStorage.locationSend = await JSON.stringify(location);
            let data = await {
                airport_name:location.airport_name,
                longitude:location.longitude,
                latitude:location.latitude,
                one_night_cost:+location.one_night_cost
            }
            const AuthStr = await 'Bearer '+ctx.rootState.Users.user.token;
            this.$axios.post("/add_airport",data,{headers:{Authorization:AuthStr,'Access-Control-Allow-Origin':'*','Content-Type':'application/json'}})
             .then(res=>{
                this.$router.push('/loc');
                ctx.dispatch('getLoction');
                delete localStorage.data;
              })
             .catch((err)=>{console.log('error ' + err);delete localStorage.data;});
        }else{
            console.log('await')
        }
        await ctx.commit('endUploadSingle');
    },

    async editLocation(ctx, location){
        ctx.commit('startUploadSingle');
        let data = {
            id_airport:location.id_airport,
            airport_name:location.airport_name,
            longitude:location.longitude,
            latitude:location.latitude,
            one_night_cost:+location.one_night_cost
        }
        const AuthStr = await 'Bearer '+ctx.rootState.Users.user.token;
        this.$axios.post("/change_airport", data ,
        { 
            headers: { 
                Authorization: AuthStr,
                'Access-Control-Allow-Origin': '*',
                'Content-Type': 'application/json'
            } 
        })
         .then(res => {
            ctx.commit('editLocation',location);
            this.$router.push('/loc');
          })
         .catch((err) => {
             console.log('error ' + err);
          });
          ctx.commit('endUploadSingle');
    },

    async deleteLocation(ctx,index){
        const AuthStr = await 'Bearer '+ctx.rootState.Users.user.token;
        this.$axios.post("/delete_airport", {id_airport:index} ,
        { 
            headers: { 
                Authorization: AuthStr,
                'Access-Control-Allow-Origin': '*',
                'Content-Type': 'application/json'
            } 
        })
         .then(res => {
            ctx.dispatch('getLoction');
          })
         .catch((err) => {
             console.log('error ' + err);
          });
    }
}