<template>
  <div>
    <Menu logged-in="false" />
    {{ user }}
    <span @click="login()">Login</span>
    <span @click="logout()">logout</span>
    <span @click="loginWithGoogle()">loginWithGoogle</span>
    <span @click="updateUser()">updateUser</span>
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
  mounted() {
    const session = this.$supabase.auth.session();
    console.log(session);

    const user = this.$supabase.auth.user();
    console.log(user);

    console.log(this.$store.state.user);
  },
  methods: {
    async updateUser() {
      const { user, error } = await this.$supabase.auth.update({
        data: { hello: "world" },
      });
      console.log(user, error);
    },
    async loginWithGoogle() {
      const { user, session, error } = await this.$supabase.auth.signIn(
        {
          provider: "discord",
        },
        {
          redirectTo: "http://localhost:3000/home",
        }
      );
      console.log(user);
      console.log(session);
      console.log(error);
      this.$store.state.user = user;
      this.$store.state.session = session;
    },
    async login() {},
    async logout() {},
  },
};
</script>
<style scoped>
span {
  border: solid;
  padding: 1rem;
}
</style>
