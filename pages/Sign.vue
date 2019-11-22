<template>
  <div>
    <div v-if='errMsg' class="alert alert-warning alert-dismissible fade show" role="alert">
      <strong class='mx-auto'>{{errMsg}}!</strong> 
      <button type="button" class="close" @click="$store.commit('Users/delErrMsg')">&times;</button>
    </div>
    <b-form class='auth' @submit.prevent="sign">
      <h3 class='nVsSm'>Welcome</h3>
        <b-form-group label="Email address:" label-for="mail" description="We'll never share your email with anyone else.">
            <b-form-input id="mail" v-model="form.email" @input='form.email = form.email.replace(/\s+/gi,"")' type="email" required placeholder="Enter email" ></b-form-input>
        </b-form-group>
        <b-form-group label="Your password:" label-for="pass" description="We do not save your passwords.">
            <b-form-input id="pass" type='password' v-model="form.password" required placeholder="Enter password" ></b-form-input>
        </b-form-group>
        <b-form-group>
          <b-form-checkbox v-model="form.member">Remember me</b-form-checkbox>
        </b-form-group>
      <button type='submit' class='btn btn-success'>Sign in</button>
      <button @click='passReserModal()' type='button' class='btn btn-secondary'>Password reset</button>
    </b-form>
    <b-modal id="rP" title="Password reset" centered hide-footer>
      <div v-if='err1' class="alert alert-warning alert-dismissible fade show" role="alert">
        <strong class='mx-auto'>{{err1}}!</strong> 
        <button type="button" class="close" @click="err1=''">&times;</button>
      </div>
        <b-form @submit.prevent="passReset">
        <b-form-group  label="Email address:" label-for="mC">
          <b-form-input id="mC" @input='form.email = form.email.replace(/\s+/gi,"")' v-model="form.email" type="email" required placeholder="Enter email"></b-form-input>
        </b-form-group>
        <button v-if='!send' type='submit' class='btn btn-success'>Password reset</button>
        <b-button v-else disabled class="btn btn-success" type="button">
          <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>Loading...
        </b-button>
      </b-form>
    </b-modal>
    <b-modal id='sNp' title="New password" centered hide-footer>
      <b-form @submit.prevent="sendNewPass">
      <div v-if='err2' class="alert alert-warning alert-dismissible fade show" role="alert">
        <strong class='mx-auto'>{{err2}}!</strong> 
        <button type="button" class="close" @click="err2=''">&times;</button>
      </div>
      <p>We have sent you a verification code to your mail.</p>
        <b-form-group  label="Enter code in Email address:" label-for="CodeM">
          <b-form-input id="CodeM" v-model="reset.email_code" placeholder="Enter code"></b-form-input>
        </b-form-group>
        <b-form-group  label="New password:" label-for="nPass">
          <b-form-input type='password' id="nPass" v-model="reset.new_password" placeholder="Enter password"></b-form-input>
        </b-form-group>
        <b-form-group  label="Confirm password:" label-for="nCPass">
          <b-form-input type='password' id="nCPass" v-model="reset.confirm_password" placeholder="Enter password"></b-form-input>
        </b-form-group>
        <button v-if='!send' type='submit' class='btn btn-success'>Send New Password</button>
        <b-button v-else disabled class="btn btn-success" type="button">
          <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>Loading...
        </b-button>
        <button type='button' @click="passReserModal()" class='btn btn-secondary'>Repeat password reset</button>
      </b-form>
    </b-modal>
  </div>
</template>
<script>
  export default {
    computed:{
      errMsg(){return this.$store.getters['Users/errMsg']}
    },
    data:()=>({
      err1:'',
      err2:'',
      send:false,
      reset:{
        email_code:'',
        new_password:'',
        confirm_password:''
      },
      form:{
        email: '',
        password: '',
        member:false
      }
    }),
    methods: {
      async sign(){
        await this.$store.dispatch('Users/Sign',this.form);
      },

      async passReserModal(){
        this.send = false;
        this.err1='';
        this.$bvModal.show('rP');
        this.$bvModal.hide('sNp');
      },

      async sendNewPassModal(){
        this.send = false;
        this.err2='';
        this.$bvModal.show('sNp');
        this.$bvModal.hide('rP');
      },

      async passReset(){
        this.send = true;
        this.$axios.post("/recovery_pass",{"email":this.form.email},{ headers: {'Content-Type': 'application/json','Access-Control-Allow-Origin': '*', } })
        .then(res => {
          this.send = false;
          this.sendNewPassModal()
         }).catch((err) => {
            this.err1 = err.response.data.error;
            this.send = false;
        });
      },

      async sendNewPass(){
        this.send = true;
        this.$axios.post("/send_new_pass",this.reset,{ headers: {'Content-Type': 'application/json','Access-Control-Allow-Origin': '*', } })
        .then(res => {
          this.send = false;
          this.form.password = this.reset.new_password;
          this.sign();
        }).catch((err) => {
          this.err2 = err.response.data.error;
          this.send = false;
        });
      }
    },
    mounted(){
      if(this.$store.state['Users'].user.email){this.$router.push('/')}
    }
  }
</script>
<style scoped>
.auth{
  text-align:center;
  border-radius:10px;
  box-shadow: 0 0 5px rgba(0,0,0,0.5);
  margin:1.5vw auto;
  padding:25px;
  max-width:500px;
}
@media(max-width:500px){
  .auth{
    box-shadow:none;
    padding:0;
  }
}
</style>
<style>
.slide-top{animation:slide-top .5s cubic-bezier(.25,.46,.45,.94) both}
.fade-in{animation:fade-in 1.2s cubic-bezier(.39,.575,.565,1.000) both}
@keyframes slide-top{0%{transform:translateY(-1000px);opacity:0}100%{transform:translateY(0);opacity:1}}
@keyframes fade-in{0%{opacity:0}100%{opacity:1}}
</style>