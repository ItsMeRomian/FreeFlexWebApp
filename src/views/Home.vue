<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
  </div>
  <div v-for="job in jobs" :key="job.id" style="border:solid">
    <Job :job="job"/>
  </div>
</template>

<script lang="ts">
import {CalculateJob} from '@/lib/CalculateJob';
import { defineComponent } from 'vue';
import {db} from "@/lib/Firebase";
import Job from "@/components/Job.vue";
import {JobInterface} from "@/lib/interfaces/job.interface";

export default defineComponent({
  name: 'Home',
  components: {
    Job
  },
  data(){
    return {
      jobs: Array<JobInterface>()
    }
  },
  computed: {
  },
  async mounted() {
    const user = db.collection('workers').doc(this.$store.state.firebaseAccount.userID);
    const ref = await user.collection('jobs')/*.where('a', '==', 'b')*/.orderBy('date').get();
    ref.forEach(doc => {
      const job = doc.data()
      job.id = doc.id
      job.calculator = new CalculateJob(job as JobInterface)
      this.jobs.push(job as any) // TODO: Fix
    })
  }
});
</script>
