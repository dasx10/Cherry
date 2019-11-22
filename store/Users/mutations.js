export default {
    Sign(state,user){
      state.user.email=user.email;
      state.user.role=user.role;
      state.user.token=user.auth_token;
      if(user.role == 3)
      this.$router.push('/profile');
      else if(user.role == 1){
        this.$router.push('/trans');
      }
    },

    Edit(state,user){
      if(state.user.name!=user.name){
        state.user.name=user.name;
      }
      if(state.user.email!=user.email){
        state.user.email=user.email;
      }
    },

    controlToken(state){
      if(state.user.token != localStorage.token){
        state.user.token = localStorage.token
      }
      if(state.user.email != localStorage.email){
        state.user.email = localStorage.email
      }
      if(state.user.role != localStorage.role){
        state.user.role = localStorage.role;
      }
    },

    setProfile(state,data){
      state.user.valet_id=data.valet_id;
      state.user.avg_rate=data.avg_rate;
      state.user.id_airport=data.id_airport;
      state.user.name=data.full_name;
      state.user.ava=data.profile_picture_path;
      state.user.car_model=data.car_model;
      state.user.plate_number=data.plate_number;
      state.user.airport_name=data.airport_name;
    },

    Logout(state){
      state.user={
        name:'',
        email:'',
        role:'',
        token:'',
        ava:''
      };
      if(localStorage.token){
        delete localStorage.token;
      }
      if(localStorage.role){
        delete localStorage.role;
      }
      this.$router.push('/sign');
    },

    del(state, index){
      state.valets.splice(index, 1);
    },
    
    setValet(state,data){
      if(data.i!==false){
        state.valets[data.i].Name = data.Name;
        state.valets[data.i].Email = data.Email
      }else{
        let d=new Date();
          let t=d.getDay()+"/"+d.getMonth()+"/"+d.getFullYear();
          let valet = {
            Name:data.Name,
            Email:data.Email,
            Valet_ID:d.getTime(),
            time:t
        }
        state.valets.unshift(valet)
      }
    },

    setValets(state, data){
      state.valets = data;
    },

    setErrMsg(state,msg){
      state.errMsg = msg;
    },

    delErrMsg(state){
      state.errMsg = '';
    },

    startUpload(state){
      state.errMsg = '';
      state.upload = true;
    },

    endUpload(state){
      state.upload = false;
    },

    startUploadSingle(state){
      state.errMsg = '';
      state.singlUpload = true;
    },

    endUploadSingle(state){
      state.singlUpload = false;
    }
 }