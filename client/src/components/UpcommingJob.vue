<template>
    <div class="">
        <h3>Next up</h3>
        <job :item="this.job['job_id']" variant="medium"></job>
    </div>
</template>

<script>
    import Job from "./items/Job";
    import axios from "axios";
    export default {
        name: "UpcommingJob",
        components: {
            Job
        },
        data () {
            return {
                job: null
            }
        },
        async mounted() {
            await axios
                .post('http://192.168.1.200/YoungOnes/API/Jobs/Get', {
                    "order": "job_date",
                    "sort": "DESC"
                }).then((response) => {
                    this.job = response.data.return[0]
                }).catch(error => console.log(error))
        }
     }

</script>

<style scoped>

</style>