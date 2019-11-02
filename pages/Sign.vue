<template>
  <div class="mt-5">
    <b-form class='container text-center' @submit.prevent="sign" @reset="reset" v-if="show">
        <b-form-group id="input-group-1" label="Email address:" label-for="email" description="We'll never share your email with anyone else.">
            <b-form-input id="email" v-model="form.email" type="email" required placeholder="Enter email" ></b-form-input>
        </b-form-group>
        <b-form-group id="input-group-2" label="Your password:" label-for="password">
            <b-form-input id="password" type='password' v-model="form.password" required placeholder="Enter password" ></b-form-input>
        </b-form-group>
      <b-form-group id="input-group-4">
        <b-form-group id="checkboxes-4">
          <b-form-checkbox v-model="form.member">Remember me</b-form-checkbox>
        </b-form-group>
      </b-form-group>
      <b-button type="submit" variant="success">Submit</b-button>
      <b-button type="reset" variant="secondary">Reset</b-button>
    </b-form>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        form: {
          email: '',
          password: '',
          member:false
        },
        show: true
      }
    },
    methods: {
      async sign(){
        await this.$store.commit('Users/Sign',this.form)
      },
      async reset(){
        this.form = {
          email:'',
          password:'',
          member:false
        }
      }
    }
  }
</script>