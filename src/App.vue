<template>
  <Menu/>
  <router-view/>
</template>

<style>
</style>
<script>
  import Menu from "@/components/Menu";
  export default {
    components: {Menu},
    mounted() {
      //if (!this.$store.state.loggedIn) this.$router.push('/login')
      console.log(this.$store.state)
    }
  }
</script>