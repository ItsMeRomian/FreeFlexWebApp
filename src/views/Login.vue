<template>
    <div>
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
                    this.$store.commit('setLoggedInUser', googleUser.getBasicProfile());
                    this.user = await db.collection('workers').doc(this.$store.state.loggedInUser.xR).get()
                        .then((doc) => {
                            console.log(doc.data())
                            this.$toast.success('Login success')
                            this.$store.commit('setFirebaseAccount', doc.data());
                        })
                        .catch((err) => {
                            err
                            console.log("ERROR")
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

                } catch (error) {
                    console.error(error);
                }
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