<template>
    <div class="border" v-if="jobs">Job Item! {{item}} | Size: {{variant}}<br>
        <div v-if="loading">Loading...</div>
        <div v-if="variant === 'small'">
            small worker
        </div>
        <div v-else-if="variant === 'medium'">
            medium worker
        </div>
        <div v-else-if="variant === 'big'">
            Worker name: {{worker.worker_firstname}} {{worker.worker_lastname}} <br>
            Jobs worked: {{jobs.length}}
        </div>
        <div v-else-if="variant === undefined">No size chosen</div>
    </div>
    <div v-else>
        Cannot load
    </div>
</template>

<script>
    import axios from 'axios';
    export default {
        name: "Worker",
        props: {
            item: String,
            variant: String
        },
        data () {
            return {
                loading: true,
                jobs: null,
                worker: null
            }
        },
        mounted () {
            axios //Get the Worker
                .post('http://192.168.1.200/YoungOnes/API/Workers/Get', {
                    "id": this.$props.item
                })
                .then(response => {
                    this.worker = response.data.return[0]

                    axios //Get the Jobs assosiated to this worker
                        .post('http://192.168.1.200/YoungOnes/API/Jobs/allFromWorker', {
                            "id": this.worker.worker_id
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