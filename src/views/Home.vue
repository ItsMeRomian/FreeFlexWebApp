<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
  </div>
  <div v-for="job in jobs" :key="job.id">
    <pre>{{ job }}</pre><br>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import {db} from "@/lib/Firebase";

export default defineComponent({
  name: 'Home',
  components: {
  },
  data(){
    return {
      jobs: Array<{}>()
    }
  },
  computed: {
  },
  async mounted() {
    const user = db.collection('workers').doc(this.$store.state.loggedInUser.xR);
    const ref = await user.collection('jobs')/*.where('a', '==', 'b')*/.get();
    ref.forEach(doc => {
      this.jobs.unshift(doc.data());
    })
  }
});
</script>
