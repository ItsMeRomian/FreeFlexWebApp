<template>
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
        <router-link to="/" class="navbar-brand" href="#">FreeFlexr</router-link>
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarColor03" aria-controls="navbarColor03" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
        </button>

        <div class="collapse navbar-collapse" id="navbarColor03">
            <ul class="navbar-nav mr-auto">
                <li class="nav-item">
                    <router-link to="/" class="nav-link" >Home</router-link>
                </li>
                <li class="nav-item">
                    <router-link to="/about" class="nav-link" >About</router-link>
                </li>
                <li class="nav-item">
                    <router-link to="/create/job" class="nav-link" >Add Job</router-link>
                </li>
                <li class="nav-item">
                    <router-link to="/create/client" class="nav-link" >Add Client</router-link>
                </li>
                <li class="nav-item">
                    <router-link to="/create/expense" class="nav-link" >Add Expense</router-link>
                </li>
                <li class="nav-item">
                    <router-link to="/account" class="nav-link" >Account</router-link>
                </li>
                <li class="nav-item">
<!--                    <router-link to="/period/5" class="nav-link" href="#">Current period</router-link>-->
                </li>
                <li class="nav-item dropdown">
                    <a class="nav-link dropdown-toggle" data-toggle="dropdown" href="#" role="button" aria-haspopup="true" aria-expanded="false">Add</a>
                    <div class="dropdown-menu">
                        <router-link to="/create/job" class="dropdown-item" href="#">Job</router-link>
<!--                        <router-link to="/add/opdrachtgever" class="dropdown-item" href="#">Opdrachtgever</router-link>-->
<!--                        <router-link to="/add/worker" class="dropdown-item" href="#">Worker</router-link>-->
                    </div>
                </li>
                <li class="nav-item">
                    <router-link :to="'/periodsummary/'+getCurrentPeriod" class="nav-link btn btn-info" >{{getCurrentPeriod}}</router-link>
                </li>
            </ul>
            <ul class="my-2 my-lg-0 navbar-nav" v-if="getLogged">
                <li class="nav-item">
                    <router-link to="/account" class="nav-link" v-if="getFirestoreUser">{{getFirestoreUser.username}}</router-link>
                    <router-link to="/account" class="nav-link" v-else>Unknown User!</router-link>
                </li>
                <a class="navbar-brand" href="#">
                    <img src="" width="30" height="30" class="d-inline-block align-top" alt="">
                </a>
            </ul>
            <ul class="my-2 my-lg-0 navbar-nav" v-else>
                <li class="nav-item">
                    <router-link to="/login" class="nav-link" >Login</router-link>
                </li>
            </ul>
        </div>
    </nav>
</template>

<script>
    import {PeriodCalculator} from "@/lib/PeriodCalculator";

    export default {
        name: "Menu",
        computed: {
            getCurrentPeriod: function() {
                const periodCalculator = new PeriodCalculator(new Date());
                return periodCalculator.today()
            },
            getLogged: function() {
                return this.$store.state.loggedIn;
            },
            getUser: function() {
                return this.$store.state.loggedInUser;
            },
            getFirestoreUser: function() {
                return this.$store.state.firebaseAccount;
            }
        }
    }
</script>

<style scoped>

</style>