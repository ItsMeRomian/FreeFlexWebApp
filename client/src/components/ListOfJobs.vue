<template>
    <div class="">
        <h2>All worked jobs</h2>
        <div v-if="showLess">
            <div v-for="(job,index) in jobs" :key="job.job_id">
                <job :item="job.job_id" v-if="index <= 5" variant="small"></job>
                <hr>
            </div>
        </div>
        <div v-else>
            <div v-for="job in jobs" :key="job.job_id">
                <job :item="job.job_id" variant="small"></job>
                <hr>
            </div>
        </div>
        <button @click="showLess = false">ShowMore</button>
        <button @click="showLess = true">Showless</button>

    </div>
</template>

<script>
    import axios from 'axios';
    import Job from "./items/Job";
    export default {
        name: "ListOfJobs",
        data () {
            return {
                jobs: null,
                showLess: true
            }
        },
        components: {Job},
        mounted() {
            axios
                .post('http://192.168.1.200/YoungOnes/API/Jobs/allFromWorker', {
                    "id": 1 //Hardcoded 1
                })
                .then(response => (this.jobs = response.data.return))
                .catch(error => console.log(error))
                .finally( () => console.log("Done!"))

        }
    }
</script>

<style scoped>

</style>