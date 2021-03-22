<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
  </div>
  <ListJobs/>
</template>

<script>
import ListJobs from "@/components/ListJobs";
export default {
  name: 'Home',
  components: {ListJobs}
}
</script>
