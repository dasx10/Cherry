<template>
<div class='app'>
  <b-navbar toggleable="lg" type="dark" variant="secondary" fixed="top">
    <b-navbar-brand to="/"><img src="~/static/logo.png" width='35' height="35">Cherry</b-navbar-brand>
      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav v-if='user.name'>
          <b-nav-item to="/loc">Location</b-nav-item>
          <b-nav-item to="/trans">Transaction</b-nav-item>
          <b-nav-item to="/valets">Valets</b-nav-item>
        </b-navbar-nav>
        <b-navbar-nav class="ml-auto">
          <b-nav-item-dropdown v-if="user.name" right>
            <template v-slot:button-content><b class='text-light'>User</b></template>
            <b-dropdown-item to="/profile">Profile</b-dropdown-item>
            <b-dropdown-item @click='logout'>Sign Out</b-dropdown-item>
          </b-nav-item-dropdown>
          <b-nav-item v-else to='/Sign'>Sign-in</b-nav-item>
        </b-navbar-nav>
      </b-collapse>
  </b-navbar>
  <nuxt class='content'/>
  <footer class='fixed-bottom bg-secondary text-light text-center'>Lorem ipsum, dolor sit amet consectetur adipisicing elit.</footer>
</div>  
</template>
<script>
export default {
  computed:{
    user(){return this.$store.getters['Users/User']}
  },
  methods:{
    logout(){
      this.$store.commit('Users/Logout')
    }
  }
}
</script>
<style>
  .app{
    padding: 70px 0 60px 0;
  }
  footer{
    height:50px;
  }
  @media(max-width:576px){
    .app{
      padding:55px 0 0 0;
    }
    footer{
      display:none;
    }
  }
</style>