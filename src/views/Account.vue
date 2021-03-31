<template>
    <div class="row" v-if="getFirebaseAccount">
        <div class="col">
            <span class="display-4">{{getFirebaseAccount.username}}</span><br>
            <span class="star-holder display-6">
                <i class="bi bi-star-fill"></i>
                <i class="bi bi-star-fill"></i>
                <i class="bi bi-star-fill"></i>
                <i class="bi bi-star-fill"></i>
                <i class="bi bi-star-half"></i>
            </span>
        </div>
        <div class="col">
            <button @click="logOut" class="float-end btn btn-danger mt-3">Sign out.</button>
        </div>
    </div>
    <div class="row" v-else-if="getLogged">
        <div class="col">
            <span class="display-4">Create an account.</span><br>
            <div class="form-group ">
                <label class="col-4 col-form-label" for="username">Username.</label>
                <div class="col-4">
                    <input id="username" name="username" placeholder="" class="form-control" required="required" v-model="user.username">
                </div>
            </div>
            <pre>{{user}}</pre>
            <span class="btn btn-success" @click="makeFirebaseAccount">Make account</span>
        </div>
    </div>
    <div class="row">
        <div class="col">
            <span class="btn btn-info" @click="debugAccount = true" v-if="!debugAccount">debug account</span>
            <span class="btn btn-danger" @click="debugAccount = false" v-if="debugAccount">debug account</span>
            <div v-if="debugAccount">
                <pre>{{getLogged}}</pre>
                <pre>{{getUser}}</pre>
                <pre>{{getFirebaseAccount}}</pre>
            </div>
        </div>
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
                    userID: this.$store.state.userID,
                    userPhotoURL: this.$store.state.userPhotoURL
                },
                debugAccount: false
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
            setDebugAccount: function () {
                this.debugAccount = true;
            },
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