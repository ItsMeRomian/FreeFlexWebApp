<template>
    <div class="border" v-if="jobs">opdrachtgever Item! {{item}} | Size: {{variant}}<br>
        <div v-if="loading">Loading...</div>
        <div v-if="variant === 'small'">
            small opdrachtgever
        </div>
        <div v-else-if="variant === 'medium'">
            medium opdrachtgever
        </div>
        <div v-else-if="variant === 'big'">
            opdrachtgever name: {{opdrachtgever.opdrachtgever_name}} <br>
            opdrachtgever jobs amount: {{jobs.length}}
        </div>
        <div v-else-if="variant === undefined">No size chosen</div>
    </div>
    <div v-else>
        Cannot load
    </div>
</template>

<script>
    import axios from "axios";

    export default {
        name: "Opdrachtgever",
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