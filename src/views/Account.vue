<template>
    <div class="row" v-if="getFirebaseAccount">
        <div class="col">
            <strong class="text-uppercase">{{$store.state.userFullName}}</strong><br>
            <span class="display-4">{{getFirebaseAccount.username}}</span><br>
            <stars :rating="parseFloat(userJobsSummary.averageRating)"/>
            <p>Stats since the day you made your account ({{new Date()}}):</p>
            <table class="table text-light">
                <thead>
                <th>Values</th>
                <th>Title</th>
                </thead>
                <tbody>
                    <tr>
                        <td>{{userJobs.length}}</td>
                        <td>Jobs worked</td>
                    </tr>
                    <tr>
                        <td>{{userJobsSummary.workedHours}}</td>
                        <td>Hours worked</td>
                    </tr>
                    <tr>
                        <td>{{userJobsSummary.madeMoney}}</td>
                        <td>Made</td>
                    </tr>
                    <tr>
                        <td>{{userJobsSummary.BTW}}</td>
                        <td>BTW paid</td>
                    </tr>
                    <tr>
                        <td>{{userJobsSummary.madeKMs}}</td>
                        <td>Kilometers driven</td>
                    </tr>
                </tbody>
            </table>
        </div>
        <div class="col">
            <button @click="logOut" class="float-end btn btn-danger mt-3">Sign out</button>
        </div>
    </div>

    <div v-if="viewCharts">
        <div class="row">
            <div class="col">
                <h1>Worked Jobs</h1>
                <ChartWorkedJobs
                        :user="user"
                        :jobs="$store.state.jobs"
                />
            </div>
        </div>
        <div class="row">
            <div class="col">
                <h1>Clients you've worked for</h1>
                <ChartClients
                        :user="user"
                        :jobs="$store.state.jobs"
                />
            </div>
        </div>
        <div class="row">
            <div class="col">
                <h1>Jobs per period</h1>
                <ChartPeriods
                        :user="user"
                        :jobs="$store.state.jobs"
                />
            </div>
        </div>
    </div>

    <div class="row" v-else-if="!getFirebaseAccount">
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
    <div class="row" v-else-if="!getLogged">
        <div class="col">
            You are currently logged out. <router-link to="login">Sign in</router-link>
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
    import {JobSummary} from "../lib/JobSummary";
    import Stars from "../components/Stars";
    import ChartWorkedJobs from "../components/charts/ChartWorkedJobs";
    import ChartClients from "../components/charts/ChartClients";
    import ChartPeriods from "../components/charts/ChartPeriods";

    export default {
        name: "Account",
        components: {ChartPeriods, ChartWorkedJobs, ChartClients, Stars},
        data() {
            return {
                viewCharts: true,
                user: {
                    username: "",
                    userID: this.$store.state.userID,
                    userPhotoURL: this.$store.state.userPhotoURL,
                    userFullName: this.$store.state.userFullName
                },
                debugAccount: false,
                userJobs: this.$store.state.jobs,
                userJobsSummary: {}
            }
        },
        mounted() {
            this.userJobsSummary = new JobSummary(this.userJobs).getTotals()
        },
        computed: {
            getLogged: function() {
                console.log(this.$store.state.loggedIn)
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