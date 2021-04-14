<template>
  <div class="row">
    <div class="col">
      <h1>Welkom, {{this.$store.state.firebaseAccount.username}}!</h1>
      <h3>Check hier je laatste jobs</h3>
      <strong>Viewing {{jobs.length}} job(s)</strong>
    </div>
  </div>

  <div class="row">
    <div class="col">
      <label for="inputEmail4">Sorteer op:</label>
      <select id="inputEmail4" name="wayOfTravel" required="required" class="form-control custom-select" v-model="orderBy">
        <option value="date">date</option>
        <option value="title">title</option>
        <option value="rate">rate</option>
        <option value="rating">rating</option>
        <option value="hours">hours worked</option>
        <option value="money">made money</option>
      </select>
    </div>
    <div class="col">
      <label for="inputPassword4">Filter op periode:</label>
      <input v-model="filterPeriod" id="inputPassword4" class="form-control" placeholder="2020Q2">
    </div>
    <div class="col">
      <label for="inputcheck">Flip</label>
      <input class="form-check-input" type="checkbox" value="" id="inputcheck" v-model="flip">
    </div>
    <div class="col">
      <label for="state">Sorteer op:</label>
      <select id="state" name="state" required="required" class="form-control custom-select" v-model.number="state">
        <option value="-1">Filter on state</option>
        <option value="1">Worked</option>
        <option value="2">Waiting for payment</option>
        <option value="3">Ready to check out</option>
        <option value="4">To be worked</option>
        <option value="0">invalid state</option>
      </select>
    </div>
    <div class="col-6"></div>
  </div>
  <div class="row mt-5">
    <div class="col">
      <ListJobs
              :orderBy="orderBy"
              :filterPeriod="filterPeriod"
              :filterState="state"
              :flip="flip"
              @emitJobs="jobs = $event"
              showFew=true
      />
    </div>
  </div>

</template>

<script lang="ts">
import { defineComponent } from 'vue';
import ListJobs from "@/components/ListJobs.vue";

export default defineComponent({
  name: 'Home',
  components: {
    ListJobs
  },
  data(){
    return {
      orderBy: "date",
      state: 4,
      filterPeriod: "",
      flip: false,
      jobs: []
    }
  },
});
</script>
