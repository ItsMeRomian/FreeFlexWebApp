<template>
  <div class="createClient">
    <Menu loggedIn="true" />
    <div class="container">
      <div class="row">
        <div class="col-5">
          <h1>Add a new Client</h1>

          <label for="name" class="col-sm-2 col-form-label">Name of Client</label>
          <input type="text" name="name" id="name" class="form-control" v-model="inputValues.name" />

          <label for="KVK" class="col-sm-2 col-form-label">KVK</label>
          <input type="text" name="KVK" id="KVK" class="form-control" v-model="inputValues.KVK" />

          <label for="BTW" class="col-sm-2 col-form-label">BTW</label>
          <input type="text" name="BTW" id="BTW" class="form-control" v-model="inputValues.BTW" />

          <label for="contact" class="col-sm-2 col-form-label">contact</label>
          <input type="text" name="contact" id="contact" class="form-control" v-model="inputValues.contact" />

          <label for="user_id" class="col-sm-2 col-form-label">user_id</label>
          <input type="text" name="user_id" id="user_id" class="form-control" v-model="inputValues.user_id" disabled />
          <button class="btn btn-success mt-2" @click="makeClient()">Create client</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data: function () {
    return {
      inputValues: {
        user_id: this.$store.state.user.id,
      },
    };
  },
  methods: {
    async makeClient() {
      //TODO: Check if values are empty
      const { data, error } = await this.$supabase.from("clients").insert([this.inputValues]);
      if (!error) {
        this.$toast.success("Made Client!");
      }
    },
  },
};
</script>

<style></style>
