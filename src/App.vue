<template>
  <Menu :v="v"/>
  <div :class="{
    'container': this.$route.name !== 'Table View',
    'container-fluid': this.$route.name === 'Table View'
  }">
    <router-view/>
  </div>
  <Footer :v="v"/>
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
    data() {
      return {
        v: "1.0.0"
      }
    },
    mounted() {
      //if (!this.$store.state.loggedIn) this.$router.push('/login')
      console.log(this.$store.state)
    }
  }
</script>