<template>
  <div class="viewAllClients">
    <Menu loggedIn="true" />
    <div class="container">
      <div class="row">
        <div class="col-10">
          <table class="table">
            <thead>
              <tr>
                <td>ID</td>
                <td>Name</td>
                <td>BTW</td>
                <td>KVK</td>
                <td>email</td>
                <td>owner</td>
                <td>amountOfJobs</td>
              </tr>
            </thead>
            <tbody>
              <tr v-for="client in clients" v-bind:key="client.id">
                <td>{{ client.id }}</td>
                <td>{{ client.name }}</td>
                <td>{{ client.KVK }}</td>
                <td>{{ client.BTW }}</td>
                <td>{{ client.contact }}</td>
                <td>{{ client.user_id }}</td>
                <td v-if="client.amountOfJobs">{{ client.amountOfJobs }}</td>
                <td v-else><button class="btn btn-info" @click="getAmountOfJobs(client.id)">COUNT</button></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data: function () {
    return {
      clients: [],
    };
  },
  async mounted() {
    this.clients = await this.getClients();
  },
  methods: {
    async getClients() {
      const { data, error } = await this.$supabase.from("clients").select();
      return data;
    },

    async getAmountOfJobs(clientId) {
      const { data, error } = await this.$supabase.from("jobs").select("id", { count: "exact" }).match({ client_id: clientId });
      console.log(data);

      this.clients.forEach((client) => {
        if (client.id === clientId) {
          client.amountOfJobs = data.length;
        }
      });
    },
  },
};
</script>

<style></style>
