<template>
  <div class="viewClient">
    <Menu logged-in="true" />
    <div class="container">
      <div class="row">
        <div class="col">
          <h1>Viewing client {{ client.name }}</h1>
          <p>Client has {{ jobs.length }} jobs</p>
          >
          <table class="table">
            <thead>
              <tr>
                <td>ID</td>
                <td>name</td>
                <td>rate</td>
                <td>time</td>
                <td>date</td>
              </tr>
            </thead>
            <tbody>
              <tr v-for="job in jobs" :key="job.id">
                <td>
                  <router-link :to="'/view/job/' + job.id">{{ job.id }}</router-link>
                </td>
                <td>{{ job.title }}</td>
                <td>{{ job.rate }}</td>
                <td>{{ job.start }} - {{ job.end }}</td>
                <td>{{ job.date }}</td>
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
  asyncData({ params }) {
    const slug = params.slug;
    return { slug };
  },
  data() {
    return {
      client: {},
      jobs: [],
    };
  },
  mounted() {
    this.getClient();
  },
  methods: {
    async getClient() {
      const { data, error } = await this.$supabase.from("clients").select().match({ id: this.slug }).limit(1);
      if (!error) {
        this.client = data[0];
        this.$toast.info(`Found Client `);
        this.getJobsOfClient();
      } else {
        this.$toast.error("client not found!");
      }
    },
    async getJobsOfClient() {
      const { data, error } = await this.$supabase.from("jobs").select().match({ client_id: this.slug });
      if (!error) {
        this.jobs = data;
        this.$toast.info(`Found Jobs of client `);
      } else {
        this.$toast.error("no jobs found!");
      }
    },
  },
};
</script>

<style></style>
