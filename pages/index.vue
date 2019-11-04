<template>
  <h1 class='text-center'>Welcome page</h1>
</template>
<script>
export default {
  mounted(){
    if(!this.$store.state['Users'].user.name){
      this.$router.push('/sign')
    }
  }
}
</script>