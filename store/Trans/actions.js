export default {
    async getTrans(ctx){
        const AuthStr = await 'Bearer '+ctx.rootState.Users.user.token;
        this.$axios.get("/transaction_list", { headers: { Authorization: AuthStr} })
         .then(res => {
             ctx.commit('setTrans',res.data.data.transaction_list);
          })
         .catch((err) => {
             console.log(err.request);
        });
    },
}