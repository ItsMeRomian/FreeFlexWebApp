<template>
  <div class="about">
    <h1>This is an about page</h1>
    {{this.$store.state.count}}
    {{this.$store.state.loggedInUser}}
    {{this.$store.state.loggedIn}}
    <button v-on:click="increment">Increment</button>
  </div>
</template>
<script>
  export default {
    name: "About",
    methods: {
      increment()
      {
        this.$store.commit('increment')

      }
    }
  }
</script>