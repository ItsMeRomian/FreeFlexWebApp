<template>
  <div class="profile">
    <Menu logged-in="false" />

    <div v-if="profile" class="container">
      <div class="row">
        <div class="col"><span class="btn btn-success" @click="true">(re)get profile</span></div>
      </div>
      <div class="row">
        <div class="col">
          <ClickToEdit :value="profile.username" @changedData="newValues.username = $event" />
          <ClickToEdit :value="profile.KVK" @changedData="newValues.KVK = $event" />
          <ClickToEdit :value="profile.BTW" @changedData="newValues.BTW = $event" />
        </div>
      </div>
    </div>

    <div v-if="!profile" class="container">
      <h1>New Here? Make an account!</h1>
      <div class="row">
        <div class="col-10">
          <label for="username" class="col-sm-2 col-form-label">Email</label>
          <input v-model="makeAccount.username" type="text" name="username" placeholder="Your username" class="form-control" />
          <label for="profile_picture_link" class="col-sm-2 col-form-label">profile_picture_link</label>
          <input v-model="makeAccount.profile_picture_link" type="text" name="profile_picture_link" placeholder="Your profile_picture_link" class="form-control" />
          <label for="BTW" class="col-sm-2 col-form-label">BTW</label>
          <input v-model="makeAccount.BTW" type="text" name="BTW" placeholder="Your BTW" class="form-control" />
          <label for="KVK" class="col-sm-2 col-form-label">KVK</label>
          <input v-model="makeAccount.KVK" type="text" name="KVK" placeholder="Your KVK" class="form-control" />
          <button class="btn btn-success mt-1" @click="createAccount()">Create account</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ClickToEdit from "@/components/ClickToEdit.vue";
export default {
  components: {
    ClickToEdit,
  },
  data() {
    return {
      newValues: {},
      makeAccount: {
        username: "",
        profile_picture_link: "",
        BTW: 0,
        KVK: 0,
      },
    };
  },
  computed: {
    profile() {
      return this.$store.state.profile;
    },
  },
  async mounted() {},
  methods: {
    async createAccount() {
      if (!this.profile && this.$store.state.user) {
        // TODO: Check if values are empty
        const { data, error } = await this.$supabase.from("profile").insert([
          {
            user_id: this.$store.state.user.id,
            profile_picture_link: this.makeAccount.profile_picture_link,
            username: this.makeAccount.username,
            BTW: this.makeAccount.BTW,
            KVK: this.makeAccount.KVK,
          },
        ]);
        if (error === null) {
          this.$store.commit("setProfile", data[0]);
          this.$toast.success(`Welcome ${this.makeAccount.username}! Go ahead and add a client.`);
          this.$router.push("/home");
        }
      }
    },
  },
};
</script>

<style></style>
