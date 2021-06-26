<template>
  <div class="createClient">
    <Menu logged-in="true" />
    <div class="container">
      <div class="row">
        <div class="col-5">
          <h1>Add a new Client</h1>

          <label for="name" class="col-sm-2 col-form-label">Name of Client</label>
          <input id="name" v-model="inputValues.name" type="text" name="name" class="form-control" />

          <label for="KVK" class="col-sm-2 col-form-label">KVK</label>
          <input id="KVK" v-model="inputValues.KVK" type="text" name="KVK" class="form-control" />

          <label for="BTW" class="col-sm-2 col-form-label">BTW</label>
          <input id="BTW" v-model="inputValues.BTW" type="text" name="BTW" class="form-control" />

          <label for="contact" class="col-sm-2 col-form-label">contact</label>
          <input id="contact" v-model="inputValues.contact" type="text" name="contact" class="form-control" />

          <label for="user_id" class="col-sm-2 col-form-label">user_id</label>
          <input id="user_id" v-model="inputValues.user_id" type="text" name="user_id" class="form-control" disabled />
          <button class="btn btn-success mt-2" @click="makeClient()">Create client</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      inputValues: {
        user_id: this.$store.state.user.id,
      },
    };
  },
  methods: {
    async makeClient() {
      // TODO: Check if values are empty
      const { error } = await this.$supabase.from("clients").insert([this.inputValues]);
      if (!error) {
        this.$toast.success("Made Client!");
      }
    },
  },
};
</script>

<style></style>
