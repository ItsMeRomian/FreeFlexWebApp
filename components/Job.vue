<template>
  <div class="card mb-1" style="cursor: pointer; background: #f7f7ff; color: #3d3d3d">
    <div class="card-header" @click="linkToJob">
      <span class="float-left display-6">{{ job.title }}</span>
      <!-- <Stars :rating="job.rating" class="float-end"/> -->
    </div>
    <div class="card-body">
      <table class="d-inline-block" style="font-size: 1.5rem">
        <tr>
          <td><i class="bi bi-clock"></i></td>
          <td class="mx-3">{{ calculator.formatTime().format("DD MMMM 'YY") }} · {{ job.start }} - {{ job.end }} ({{ calculator.getWorkedHours().toFixed(2) }})</td>
        </tr>
        <tr>
          <td><i class="bi bi-cup-straw"></i></td>
          <td>{{ job.break }}</td>
        </tr>
        <tr>
          <td><i class="bi bi-cash"></i></td>
          <td>{{ formatter.money(job.rate) }} Hourly</td>
        </tr>
        <tr>
          <td><i class="bi bi-cash-stack"></i></td>
          <td>{{ formatter.money(calculator.getExclBTW()) }}</td>
        </tr>
      </table>
      <!-- <img src="../assets/map-placeholder.png" class="float-end" /> -->
    </div>
    <div class="card-footer">
      <span v-if="calculator.getJobStatus() === 4" class="badge bg-info">Not worked yet</span>
      <span v-if="calculator.getJobStatus() === 3" class="badge bg-info">Ready to checkout</span>
      <span v-if="calculator.getJobStatus() === 2" class="mx-2 badge bg-danger">waiting for payment</span>
      <span v-if="calculator.getJobStatus() === 1" class="badge bg-success">checked out</span>
      <span class="mx-1" />
      <span v-if="calculator.getJobStatus() === 1" class="badge bg-success">paid</span>
      <span v-if="calculator.getJobStatus() === 0" class="badge bg-warning">Invalid state!</span>
      <span class="badge bg-dark float-end">{{ job.period }}</span>
    </div>
  </div>
</template>

<script>
import CalculateJob from "@/assets/CalculateJob";
// import Stars from "@/components/Stars";
import Formatter from "@/assets/Formatter";

export default {
  name: "Job",
  props: {
    job: {},
  },
  //   components: { Stars },
  data() {
    return {
      calculator: new CalculateJob(this.job),
      formatter: new Formatter(),
    };
  },
  methods: {
    linkToJob() {
      this.$router.push("/view/job/" + this.job.id);
    },
  },
};
</script>

<style scoped>
.bi {
  margin-right: 0.5rem;
}
td {
  font-size: 20px;
}
</style>
