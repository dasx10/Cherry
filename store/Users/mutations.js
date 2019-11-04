export default {
    Sign(state,user){
      if(!user.name){user.name=user.email.split('@')[0]};
      state.user=user;
      state.user.status = 'Admin'
      localStorage.name=user.name;
      this.$router.push('/')
    },
    Logout(state){
      delete localStorage.name;
      state.user={};
      this.$router.push('/sign');
    }
 }