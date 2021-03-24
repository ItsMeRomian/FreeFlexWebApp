<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
  </div>
  <select id="wayOfTravel" name="wayOfTravel" required="required" class="custom-select" v-model="orderBy">
    <option value="title">title</option>
    <option value="period">period</option>
    <option value="rate">rate</option>
    <option value="wayOfTravel">wayOfTravel</option>
  </select>
  <input v-model="filterPeriod" placeholder="2020Q2">
  <ListJobs :orderBy="orderBy" :filterPeriod="filterPeriod"/>
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
      orderBy: "",
      filterPeriod: "",
      jobs: Array<JobInterface>()
    }
  },
});
</script>
