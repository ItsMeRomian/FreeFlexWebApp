<template>
  <div>
    <Menu logged-in="true" />
    <div class="container">
      <div class="row">
        <div class="col">
          <h1>Welcome, {{ $store.state.profile.username }}</h1>
        </div>
      </div>
      <div class="row">
        <div class="col">
          <h3>Your Latest jobs</h3>
          <span class="btn btn-success" @click="getJobs()">getJobs</span>
          <!-- <pre>{{ jobs }}</pre> -->
          <Job v-for="job in jobs" :key="job.id" :job="job" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Job from "~/components/Job.vue";
import Menu from "~/components/Menu.vue";
export default {
  components: { Menu, Job },
  data() {
    return {
      jobs: {},
    };
  },
  mounted() {
    this.getJobs();
  },
  methods: {
    async getJobs() {
      const { data, error } = await this.$supabase.from("jobs").select().order("date", { ascending: false });
      if (error) this.$toast.error(error);
      this.jobs = data;
      console.log(data);
    },
  },
};
</script>

<style></style>
