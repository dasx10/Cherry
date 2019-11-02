export default {
    async Sign(ctx,user){
        const res = await this.$axios.post('http://localhost:3000/api/users/',user);
        if(res.data){
            res.data.mail=user.mail;
            ctx.commit('Sign',res.data);
        }else{
            console.log(res.data)
        }
    }
}