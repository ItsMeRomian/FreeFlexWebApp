<template>
    Account
<!--    <h1>IsAuthorized: {{ this.$gAuth.isAuthorized }}</h1>-->
    <span v-if="getLogged" style="background:green">Hi! You are logged in.</span>
    <span v-if="!getLogged" style="background:red">You have no access to this page.</span>
    <button @click="logOut">Sign out.</button>
    <div v-if="!getFirebaseAccount">No firebase Account<br>
        <input v-model="user.username" placeholder="username">
        <pre>{{user}}</pre>
        <span class="btn btn-success" @click="makeFirebaseAccount">Make account</span>
    </div>
</template>

<script>
    import { db } from "@/lib/Firebase";

    export default {
        name: "Account",
        data() {
            return {
                user: {
                    username: "",
                    userID: this.$store.state.loggedInUser.getId()
                }
            }
        },
        computed: {
            getLogged: function() {
                return this.$store.state.loggedIn;
            },
            getUser: function() {
                return this.$store.state.loggedInUser;
            },
            getFirebaseAccount: function() {
                return this.$store.state.firebaseAccount;
            }
        },
        methods: {
            logOut: async function () {
                await this.$gAuth.signOut();
                this.$store.commit('doLogout');
                //this.$router.push('/')
            },
            makeFirebaseAccount: async function () {
                const workersRef = db.collection('workers').doc(this.user.userID);
                await workersRef.set(this.user)
                this.$store.commit('setFirebaseAccount', this.user)
                this.$toast.success("Gefeliciiteierdd, je heet nu " + this.$store.state.firebaseAccount.username)
            }
        }

    }
</script>

<style scoped>

</style>