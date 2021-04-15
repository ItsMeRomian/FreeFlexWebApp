<template>
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark mb-5">
        <div class="container-fluid">
            <router-link class="navbar-brand" to="/">
                <img src="https://thigh.pics/eeBadbD.png"  height="30" class="d-inline-block align-top" alt="">
                <sup class="mx-1">v{{v}}</sup>
            </router-link>
            <div class="collapse navbar-collapse">
                <ul class="navbar-nav" v-if="getLogged">
                    <li class="nav-item">
                        <router-link to="/" class="nav-link" aria-current="page" href="#">Home</router-link>
                    </li>
                    <li class="nav-item">
                        <router-link to="/about" class="nav-link" href="#">About</router-link>
                    </li>
                    <li class="nav-item">
                        <router-link to="/table" class="nav-link" href="#">Table</router-link>
                    </li>
                    <li class="nav-item dropdown">
                        <a class="nav-link dropdown-toggle" href="#" id="navbarDropdownMenuLink" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                            Add
                        </a>
                        <ul class="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                            <li><router-link to="/create/job" class="dropdown-item" href="#">Job</router-link></li>
                            <li><router-link to="/create/client" class="dropdown-item" href="#">Client</router-link></li>
                            <li><router-link to="/create/expense" class="dropdown-item" href="#">Expense</router-link></li>
                        </ul>
                    </li>
                    <li class="nav-item">
                        <router-link :to="'/periodsummary/'+getCurrentPeriod" class="nav-link btn btn-info text-light" >{{getCurrentPeriod}}</router-link>
                    </li>
                </ul>
                <ul class="navbar-nav" v-else>
<!--                    <li class="nav-item">-->
<!--                        <router-link to="/intro" class="nav-link" aria-current="page" href="#">What is FreeFlexr</router-link>-->
<!--                    </li>-->
                </ul>
            </div>
            <form class="d-flex">
                <ul class="navbar-nav" v-if="getLogged">
                    <li class="nav-item mx-3">
                        <span class="nav-link btn btn-info text-light" @click="refresh">refresh jobs</span>
                    </li>
                    <li class="nav-item">
                        <a class="navbar-brand mx-0" href="#">
                            <img :src="$store.state.userPhotoURL" width="30" height="30" class="d-inline-block rounded-circle" alt="">
                        </a>
                        <router-link to="/account" class="nav-link d-inline-block" v-if="getFirestoreUser">{{getFirestoreUser.username}} | {{((new Date().getTime() - $store.state.lastRefresh)/1000).toFixed()}} sec</router-link>
                        <router-link to="/account" class="nav-link d-inline-block" v-else>No FireBase account</router-link>

                    </li>
                </ul>
                <ul class="navbar-nav" v-else>
                    <li class="nav-item">
                        <router-link to="/login" class="nav-link btn btn-success text-white">Join Now</router-link>
                    </li>
                </ul>
            </form>
        </div>
    </nav>
</template>

<script>
    import {PeriodCalculator} from "@/lib/PeriodCalculator";

    export default {
        name: "Menu",
        props: ['v'],
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
        },
        methods: {
            refresh: function() {
                this.$store.dispatch('refreshData');
                this.$toast.info('refreshing data...')
            }
        }
    }
</script>

<style scoped>

</style>