<template >
    <div class="about">
        <h1>This is an about page</h1>
    </div>
    this.$store.state.loggedInUser
    <pre>{{this.$store.state.loggedInUser }}</pre>
    this.$store.state.loggedIn
    <pre>{{this.$store.state.loggedIn}}</pre>
    this.$store.state.firebaseAccount
    <pre>{{this.$store.state.firebaseAccount}}</pre>
    <button v-on:click="increment">Increment</button>
</template>
<script>
    export default {
        name: "About",
    }
</script>