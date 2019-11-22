<template>
  <div>
    <b-navbar toggleable="lg" type="dark" variant="secondary" fixed="top">
      <b-navbar-brand to="/">Pull</b-navbar-brand>
      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav v-if='user.email'>
          <b-nav-item to="/Air">Airport</b-nav-item>
        </b-navbar-nav>
        <b-navbar-nav class="ml-auto">
          <b-nav-item-dropdown v-if="user.email">
            <template v-slot:button-content>
              <em>User</em>
            </template>
            <b-dropdown-item href="#">Profile</b-dropdown-item>
            <b-dropdown-item @click='logout'>Sign Out</b-dropdown-item>
          </b-nav-item-dropdown>
          <b-nav-item v-else to='/Sign'>Sign-in</b-nav-item>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
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