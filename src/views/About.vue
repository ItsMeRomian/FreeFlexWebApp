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
    Jobs
    <pre>{{this.$store.state.jobs}}</pre>
    <pre>{{this.$store.state.jobCopy}}</pre>
    <button v-on:click="increment">Increment</button>
    {{this.$store.state.testObj}}
</template>
<script>
    export default {
        name: "About",
        mounted() {
            console.log(process.env)
        },
        methods: {
            increment() {
                this.$store.dispatch('refreshData');
            }
        }
    }
</script>