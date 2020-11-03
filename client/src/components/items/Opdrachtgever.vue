<template>
    <div v-if="jobs">
        <span class="float-right">opdrachtgever Item! {{item}} | Size: {{variant}}</span><br>
        <div v-if="loading">Loading...</div>
        <div v-if="variant === 'small'">
            small opdrachtgever
        </div>
        <div v-else-if="variant === 'medium'">
            medium opdrachtgever
        </div>
        <div v-else-if="variant === 'big'">
            <h1>Opdrachtgever <b>{{opdrachtgever.opdrachtgever_name}}</b></h1>
            <h4>You've worked a total of {{jobs.length}} job<span v-if="jobs.length > 1 || jobs.length === 0">s</span> for this opdrachtgever. <span v-if="jobs.length">They love you!</span></h4>

            <ListOfJobs v-if="jobs.length !== 0" jobListAlreadyGotten="true" :job-list="this.jobs"></ListOfJobs>
            <router-link to="/add/job" v-else class="btn btn-success">Add a job</router-link>
        </div>
        <div v-else-if="variant === undefined">No size chosen</div>
    </div>
    <div v-else>
        Cannot load
    </div>
</template>

<script>
    import axios from "axios";
    import ListOfJobs from "../ListOfJobs";

    export default {
        name: "Opdrachtgever",
        components: {ListOfJobs},
        props: {
            item: String,
            variant: String
        },
        data () {
            return {
                loading: true,
                jobs: null,
                opdrachtgever: null
            }
        },
        mounted () {
            axios //Get the Worker
                .post('http://192.168.1.200/YoungOnes/API/Opdrachtgevers/Get', {
                    "id": this.$props.item
                })
                .then(response => {
                    this.opdrachtgever = response.data.return[0]

                    axios //Get the Jobs assosiated to this worker
                        .post('http://192.168.1.200/YoungOnes/API/Jobs/allFromOpdrachtgever', {
                            "id": this.opdrachtgever.opdrachtgever_id
                        })
                        .then(response => { this.jobs = response.data.return })
                        .catch(error => console.log(error))
                        .finally(() => this.loading = false);

                })
                .catch(error => console.log(error))
                .finally(() => this.loading = false);

        }
    }
</script>

<style scoped>

</style>