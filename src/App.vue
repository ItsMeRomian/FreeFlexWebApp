<template>
  <Menu/>
  <div class="container">
    <router-view/>
  </div>
  <Footer/>
</template>

<style>
  a {
    color: #99c2ff;
  }
</style>
<script>
  import Menu from "@/components/Menu";
  import Footer from "@/components/Footer"
  export default {
    components: {Menu, Footer},
    mounted() {
      //if (!this.$store.state.loggedIn) this.$router.push('/login')
      console.log(this.$store.state)
    }
  }
</script>