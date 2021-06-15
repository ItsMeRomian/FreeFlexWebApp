<template>
  <div>
    {{ user }}
    <span @click="login()">Login</span>
    <span @click="logout()">logout</span>
    <span @click="loginWithGoogle()">loginWithGoogle</span>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "Account",
  components: {},
  data() {
    return {
      viewCharts: true,
    };
  },
  computed: {
    ...mapGetters({
      user: "getUser",
    }),
  },
  methods: {
    loginWithGoogle() {
      const provider = new this.$fireModule.auth.GoogleAuthProvider();
      this.$fire.auth
        .signInWithPopup(provider)
        .then((result) => {
          const credential = result.credential;
          const token = credential.accessToken;
          const user = result.user;
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          const email = error.email;
          const credential = error.credential;
          // ...
        });
    },
    async login() {
      // const provider = new this.$fire.auth.GoogleAuthProvider();
      await this.$fire.auth
        .signInWithEmailAndPassword(
          "romian.tairovski@gmail.com",
          "@dventureTime123"
        )
        .then((result) => {
          const credential = result.credential;
          // const token = credential.accessToken;
          const user = result.user;
          console.log(credential, user);
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          const email = error.email;
          const credential = error.credential;
          console.log(errorCode, errorMessage, email, credential);
        });
    },
    async logout() {
      try {
        await this.$fire.auth.signOut();
      } catch (e) {
        alert(e);
      }
    },
  },
};
</script>
<style scoped>
span {
  border: solid;
  padding: 1rem;
}
</style>
