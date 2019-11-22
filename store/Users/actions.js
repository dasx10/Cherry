export default {
    async Sign(ctx,user){
        let data = await {
            email:user.email,
            password:user.password
        }
        await this.$axios.post('/login',data,{
            headers:{
                'Access-Control-Allow-Origin': '*',
                'Content-Type': 'application/json'
            }
        })
        .then(
            res => {
                res.data.data.email = user.email;
                ctx.commit('Sign',res.data.data);
                if(user.member){
                    localStorage.token = res.data.data.auth_token;
                    localStorage.email = user.email;
                    localStorage.role = res.data.data.role;
                }else{
                    if(localStorage.token){
                        delete localStorage.token;
                    }
                    if(localStorage.role){
                        delete localStorage.role;
                    }
                }
            }
        )
        .catch(err => 
            ctx.commit('setErrMsg',JSON.parse(err.request.responseText).error)
        );
    },

    async getProfile(ctx){
        const AuthStr = await 'Bearer '+ctx.getters.User.token;
        this.$axios.get('/profile', { headers: { Authorization: AuthStr } })
         .then(res => {
             ctx.commit('setProfile',res.data.data);
          })
    },

    async editProfile(ctx, data){
        ctx.commit('startUploadSingle');
        const AuthStr = await 'Bearer '+ctx.getters.User.token; 
        this.$axios.post("/change_valet_profile",data,{headers:{Authorization: AuthStr,'Content-Type': 'application/json','Access-Control-Allow-Origin': '*', } })
         .then(res => {
            ctx.dispatch('getProfile');
            ctx.commit('endUploadSingle');
          })
         .catch((err) => {
            ctx.commit('setErrMsg',JSON.parse(err.request.responseText).error);
            ctx.commit('endUploadSingle');
          });
          
    },

    async editProfileAvatar(ctx,file){
        ctx.commit('startUploadSingle');
        let req = new FormData
        req.append('profile_picture',file);
        const AuthStr = await 'Bearer '+ctx.getters.User.token; 
        this.$axios.post("/change_profile_picture",req,{headers:{Authorization: AuthStr,'Content-Type':'multipart/form-data','Access-Control-Allow-Origin': '*', } })
         .then(res => {
            ctx.dispatch('getProfile');
            ctx.commit('endUploadSingle');
          })
         .catch((err) => {
            ctx.commit('setErrMsg',JSON.parse(err.request.responseText).error);
            ctx.commit('endUploadSingle');
        });
    },

    async Logout(ctx){
        const AuthStr = await 'Bearer '+ctx.getters.User.token; 
        this.$axios.get('/logout',{headers:{Authorization: AuthStr}})
        ctx.commit('Logout');
    },

    async getValets(ctx,activated){
        ctx.commit('startUpload');
        const AuthStr = await 'Bearer '+ctx.getters.User.token; 
        this.$axios.get("/valet_list?activated="+activated, { headers: { Authorization: AuthStr,'Content-Type': 'application/json','Access-Control-Allow-Origin': '*', } })
         .then(res=>{
             ctx.commit('setValets',res.data.data.valet_list);
          })
        ctx.commit('endUpload');
    },

    async addValet(ctx, data){
        ctx.commit('startUploadSingle');
        const AuthStr = await 'Bearer '+ctx.getters.User.token; 
        const config = { headers: {Authorization:AuthStr,'Content-Type': 'multipart/form-data'} };
        const formData = new FormData();
        formData.append('email',data.email);
        formData.append('full_name',data.full_name);
        if(data.id_airport){formData.append('id_airport',data.id_airport);}
        formData.append('profile_picture',data.profile_picture);
        this.$axios.post("/add_valet",formData,config)
         .then(res => {
            ctx.dispatch('getValets');
            ctx.commit('endUploadSingle');
          })
         .catch((err) => {
             ctx.commit('setErrMsg',JSON.parse(err.request.responseText).error);
             ctx.commit('endUploadSingle');
          });
    },

    async editValet(ctx, data){
        ctx.commit('startUploadSingle');
        const AuthStr = await 'Bearer '+ctx.getters.User.token; 
        const config = { headers: {Authorization:AuthStr,'Content-Type': 'multipart/form-data'} };
        const formData = new FormData();
        formData.append('full_name',data.full_name);
        formData.append('id_airport',data.id_airport);
        formData.append('id_valet',data.id_valet);
        formData.append('profile_picture',data.profile_picture);
        this.$axios.post("/change_valet",formData,config)
        .then(res => {
            ctx.commit('delErrMsg');
            ctx.dispatch('getValets');
            ctx.commit('endUploadSingle');
        })
        .catch((err) => {
            ctx.commit('setErrMsg',JSON.parse(err.request.responseText).error);
            ctx.commit('endUploadSingle');
        });
        
    },

    async deleteValet(ctx,data){
        let req={"id_valet":+data.id}
        const AuthStr = await 'Bearer '+ctx.getters.User.token; 
        this.$axios.post("/deactivate_valet",req, { headers: { Authorization: AuthStr,'Content-Type': 'application/json','Access-Control-Allow-Origin': '*', } })
         .then(res => {
            ctx.dispatch('getValets',1);
          })
    },
}