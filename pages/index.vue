<template>
  <div></div>
</template>
<script>
export default {
  mounted(){
    if(!this.$store.state['Users'].user.token){
      this.$router.push('/sign')
    }else if(this.$store.state['Users'].user.role == 3){
      this.$router.push('/profile')
    }else if(this.$store.state['Users'].user.role == 1){
      this.$router.push('/trans')
    }
  }
}
</script>