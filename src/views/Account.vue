<template>
    Account
<!--    <h1>IsAuthorized: {{ this.$gAuth.isAuthorized }}</h1>-->
    <span v-if="getLogged" style="background:green">Hi! You are logged in.</span>
    <span v-if="!getLogged" style="background:red">You have no access to this page.</span>
    <button @click="logOut">Sign out.</button>
</template>

<script>
    export default {
        name: "Account",
        computed: {
            getLogged: function() {
                return this.$store.state.loggedIn;
            },
            getUser: function() {
                return this.$store.state.loggedInUser;
            }
        },
        methods: {
            logOut: async function () {
                await this.$gAuth.signOut();
                this.$store.commit('doLogout');
                this.$router.push('/')
            }
        }

    }
</script>

<style scoped>

</style>