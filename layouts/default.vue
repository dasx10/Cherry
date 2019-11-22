<template>
<div class='app'>
  <b-navbar toggleable="lg" type="dark" variant="secondary" fixed="top">
    <b-navbar-brand to="/"><img src="~/static/logo.png" style='border-radius:50%;margin-right:5px;width:35px;height:35px;'>Pull</b-navbar-brand>
      <b-navbar-toggle v-if='user.token' target="nav-collapse"></b-navbar-toggle>
      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav id='navC' v-if='user.role==1'>
          <b-nav-item to="/loc">Location</b-nav-item>
          <b-nav-item to="/valets">Valets</b-nav-item>
          <b-nav-item to="/trans">Transaction</b-nav-item>
        </b-navbar-nav>
        <b-navbar-nav v-else-if='user.role==3' id='navC'>
          <b-nav-item to="/my-trans">Transaction</b-nav-item>
        </b-navbar-nav>
        <b-navbar-nav>
          <b-nav-item-dropdown v-if="user.token" right>
            <template v-slot:button-content><b class='text-light'>{{user.role==1?'Admin':'Valet'}}</b></template>
            <b-dropdown-item v-if='user.role!=1' to="/profile">Profile</b-dropdown-item>
            <b-dropdown-item @click='logout'>Sign Out</b-dropdown-item>
          </b-nav-item-dropdown>
        </b-navbar-nav>
      </b-collapse>
  </b-navbar>
  <nuxt class='content'/>
  <footer class='nVsSm fixed-bottom bg-secondary text-light text-center'>Copyright ©2019 Pull inc. All rights reserved.</footer>
</div>  
</template>
<script>
export default {
  computed:{
    user(){return this.$store.getters['Users/User']}
  },
  methods:{
    logout(){
      this.$store.dispatch('Users/Logout')
    }
  }
}
</script>
<style>
  .app{
    padding:70px 10px;
  }
  #navC{
    margin: 0 auto;
  }#navC .nav-link{
    color:#aaa;
  }#navC .nuxt-link-active{
    color:#fff;
    font-weight:bold;
    cursor:default;
  }
  .btn ~ table,form ~ table{
    margin-top:10px;
  }
  table{
    text-align:center;
  }
  table img{
    height:15px;
    width:15px;
  }
  thead{
    background:#6C757D;
    color:#fff;
    white-space:nowrap;
    font-size:15px;
  }
  .vsSm{
    display:none
  }
  footer{
    font-size:1.125rem;
    height:35px;
    padding:5px;
  }
  @media(max-width:992px){
    .app{padding:62px 2px 2px 2px;}
    .btn ~ table,form ~ table {margin-top:0;}
    thead{font-size:13px;}
    table{font-size:14px;}
  }
  @media(max-width:768px){
    .nVsMd{display:none;}
    thead{font-size:12px;}
    table{font-size:13px;}
  }
  @media(max-width:576px){
    .vsSm{display:flex;}
    .nVsSm{display:none;}
    thead{font-size:11px;}
    table{font-size:12px;}
  }
</style>