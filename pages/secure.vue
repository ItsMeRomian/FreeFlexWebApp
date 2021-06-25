<template>
  <div>
    <Menu loggedIn="true" />
    <br />
    <br />
    <br />
    <span @click="getJobs()">updateUser</span>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
import Menu from "@/components/Menu.vue";
export default {
  name: "Secure",
  components: {
    Menu,
  },
  methods: {
    async getJobs() {
      const user = this.$supabase.auth.user();
      console.log(user);

      const { data, error } = await this.$supabase.from("jobs").select();
      console.log(data, error);
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
