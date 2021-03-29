<template>
  <div class="row">
    <div class="col">
      <h1>Welkom, {{this.$store.state.firebaseAccount.username}}!</h1>
      <h3>Check hier je laatste jobs</h3>
    </div>
  </div>

  <div class="row">
    <div class="col">
      <label for="inputEmail4">Sorteer op:</label>
      <select id="inputEmail4" name="wayOfTravel" required="required" class="form-control custom-select" v-model="orderBy">
        <option value="date">date</option>
        <option value="title">title</option>
        <option value="period">period</option>
        <option value="rate">rate</option>
        <option value="wayOfTravel">wayOfTravel</option>
      </select>
    </div>
    <div class="col">
      <label for="inputPassword4">Filter op periode:</label>
      <input v-model="filterPeriod" id="inputPassword4" class="form-control" placeholder="2020Q2">
    </div>
    <div class="col-8"></div>
  </div>
  <div class="row mt-5">
    <div class="col">
      <ListJobs :orderBy="orderBy" :filterPeriod="filterPeriod"/>
    </div>
  </div>

</template>

<script lang="ts">
import { defineComponent } from 'vue';
import {JobInterface} from "@/lib/interfaces/job.interface";
import ListJobs from "@/components/ListJobs.vue";

export default defineComponent({
  name: 'Home',
  components: {
    ListJobs
  },
  data(){
    return {
      orderBy: "date",
      filterPeriod: "",
      jobs: Array<JobInterface>()
    }
  },
});
</script>
