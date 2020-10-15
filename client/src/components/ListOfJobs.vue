<template>
    <div class="">
        <h2>All worked jobs</h2>
        <button class="btn btn-primary mr-2" @click="showLess = false" v-if="showLess === true">Show all</button>
        <button class="btn btn-primary" @click="showLess = true" v-else>Show upcomming 5</button>
        <div v-if="showLess">
            <div v-for="(job,index) in jobs" :key="job.job_id">
                <job class="pb-2" :item="job.job_id" v-if="index <= 4" variant="small"></job>
            </div>
        </div>
        <div v-else>
            <div v-for="job in jobs" :key="job.job_id">
                <job class="pb-2" :item="job.job_id" variant="small"></job>
            </div>
        </div>

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
        async mounted() {
            await axios
                .post('http://192.168.1.200/YoungOnes/API/Jobs/allFromWorker', {
                    "id": 1, //Hardcoded 1
                    "sort": "job_date",
                })
                .then(response => {
                    this.jobs = response.data.return.reverse()
                })
                .catch(error => console.log(error))
                .finally( () => console.log("Done!"))

        }
    }
</script>

<style scoped>

</style>