<template>
    <div id="nav">
        <router-link to="/">Home</router-link> |
        <router-link to="/about">About</router-link> |
        <router-link to="/login" v-if="!getLogged">Login</router-link>
        <router-link to="/account" v-else>{{getUser.ot}}</router-link>
    </div>
</template>

<script>
    export default {
        name: "Menu",
        computed: {
            getLogged: function() {
                return this.$store.state.loggedIn;
            },
            getUser: function() {
                return this.$store.state.loggedInUser;
            }
        }
    }
</script>

<style scoped>

</style>