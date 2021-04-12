<template>
    <span class="btn btn-info" @click="debug = true" v-if="!debug">debug account</span>
    <span class="btn btn-danger" @click="debug = false" v-if="debug">debug account</span>
    <div class="row">
        <div class="col"></div>
        <div class="col">
            <div class="card text-light" v-if="!Vue3GoogleOauth.isAuthorized">
                <div class="card-header bg-info text-center">
                    <h2>FreeFlexr Login</h2>
                </div>
                <div class="card-body bg-secondary p-5 text-center">
                    <img class="googleLogin" src="../assets/google/normal.png" height="50" alt="Sign in" @click="handleClickSignIn">
                </div>
            </div>
            <div v-else class="text-center h2">
                You are already logged in. <a href="#" @click="handleClickSignOut">Logout?</a>
            </div>
            <div v-if="!this.$store.state.firebaseAccount && this.$store.state.isLoggedIn">
                <h2>We dont know this account yet, go to <router-link to="/account">/account</router-link></h2>
            </div>
        </div>
        <div class="col"></div>
    </div>
    <div v-if="debug">
        <h1>IsInit: {{ Vue3GoogleOauth.isInit }}</h1>
        <h1>IsAuthorized: {{ Vue3GoogleOauth.isAuthorized }}</h1>
        <h2 v-if="user">signed user: {{user}}</h2>
        <button @click="handleClickSignIn" :disabled="!Vue3GoogleOauth.isInit || Vue3GoogleOauth.isAuthorized">sign in</button>
        <button @click="handleClickGetAuthCode" :disabled="!Vue3GoogleOauth.isInit">get authCode</button>
        <button @click="handleClickSignOut" :disabled="!Vue3GoogleOauth.isAuthorized">sign out</button>
        <button @click="handleClickDisconnect" :disabled="!Vue3GoogleOauth.isAuthorized">disconnect</button>
    </div>

</template>

<script>
    import { inject, toRefs } from "vue";
    import {db} from "@/lib/Firebase";

    export default {
        name: "Login",
        props: {
            msg: String,
        },

        data(){
            return {
                user: {},
                jobs: [],
                debug: false
            }
        },
        mounted() {
            console.log(this.Vue3GoogleOauth.isAuthorized)
        },
        methods: {
            async handleClickSignIn() {
                try {
                    this.$toast.info("Starting sign in...")
                    const googleUser = await this.$gAuth.signIn();
                    if (!googleUser) {
                        return null;
                    }
                    console.log("googleUser", googleUser);
                    this.user = googleUser.getBasicProfile();
                    this.$store.commit('setLoggedIn', true);
                    this.$store.commit('setLoggedInUser', this.user);
                    this.$store.commit('setUserID', googleUser.getBasicProfile().getId());
                    this.$store.commit('setUserPhotoURL', googleUser.getBasicProfile().getImageUrl());
                    this.$store.commit('setUserFullName', this.user.getName());
                    console.log(googleUser.getBasicProfile().getId())
                    this.user = await db.collection('workers').doc(googleUser.getBasicProfile().getId()).get()
                        .then((doc) => {
                            this.$toast.success('Login success')
                            this.$store.commit('setFirebaseAccount', doc.data());
                            this.$store.dispatch('refreshData')
                            this.$router.push('/')
                        })
                        .catch((err) => {
                            console.log(err)
                            //TODO: handle no account
                        })
                } catch (error) {
                    console.error(error);
                    return null;
                }
            },
            async handleClickGetAuthCode(){
                try {
                    const authCode = await this.$gAuth.getAuthCode();
                    console.log("authCode", authCode);
                } catch(error) {
                    //on fail do something
                    console.error(error);
                    return null;
                }
            },

            async handleClickSignOut() {
                try {
                    await this.$gAuth.signOut();
                    console.log("isAuthorized", this.Vue3GoogleOauth.isAuthorized);
                    this.user = "";
                    this.$store.commit('setLoggedIn', false)
                    this.$store.commit('setLoggedInUser', null)
                    this.$store.commit('setFirebaseAccount', null)
                } catch (error) {
                    console.error(error);
                }
                this.$toast.success("You're logged out!")
            },

            handleClickDisconnect() {
                window.location.href = `https://www.google.com/accounts/Logout?continue=https://appengine.google.com/_ah/logout?continue=${window.location.href}`;
            },
        },
        setup(props) {
            const { isSignIn } = toRefs(props);
            const Vue3GoogleOauth = inject("Vue3GoogleOauth");
            return {
                Vue3GoogleOauth,
                isSignIn,
            };
        },
    };
</script>

<style>
    .googleLogin:hover {
        filter: brightness(90%);
        -webkit-transition: all 75ms ease;
    }
    .googleLogin {
        -webkit-transition: all 1s ease;
        transition: all 1s ease;
    }
    .googleLogin:focus, .googleLogin:active {
        padding-top: 1px;
    }
    button {
        display: inline-block;
        line-height: 1;
        white-space: nowrap;
        cursor: pointer;
        background: #fff;
        border: 1px solid #dcdfe6;
        color: #606266;
        -webkit-appearance: none;
        text-align: center;
        -webkit-box-sizing: border-box;
        box-sizing: border-box;
        outline: 0;
        -webkit-transition: 0.1s;
        transition: 0.1s;
        font-weight: 500;
        padding: 12px 20px;
        font-size: 14px;
        border-radius: 4px;
        margin: 0 1em 0 0;
    }

    button:disabled {
        background: #fff;
        color: #ddd;
        cursor: not-allowed;
    }
</style>