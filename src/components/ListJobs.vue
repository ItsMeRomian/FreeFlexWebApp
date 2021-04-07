<template>
    <div v-if="jobs.length">
        <div v-for="job in jobs" :key="job.id">
            <Job :job="job"/>
<!--            <pre>{{job}}</pre>-->
        </div>
    </div>
    <div v-else>
        No jobs...<br>
        <span class="btn btn-info" @click="refresh()">Refresh</span>
    </div>
</template>

<script>
import Job from "@/components/Job.vue";

export default {
    name: "ListJobs",
    components: {
        Job
    },
    emits: ["emitJobs"],
    props: [
        'orderBy',
        'filterPeriod'
    ],
    data(){
        return {
            jobs: []
        }
    },
    async mounted() {
        this.emitJobs()
        console.log(this.$store.state.doRefresh)
        await this.getData()
        this.emitJobs()
    },
    methods: {
        async getData() {
            this.jobs = this.$store.state.jobs
        },
        emitJobs() {
            this.$emit('emitJobs', this.jobs);
        }
    },
    watch: {
        orderBy: function() {
            if (this.orderBy) {
                this.jobs = []
                this.getData(this.orderBy)
                this.emitJobs()
            }
        },
        filterPeriod: function() {
            if (this.filterPeriod) {
                this.jobs = []
                this.getSpecificPeriodData(this.filterPeriod, this.orderBy)
                this.emitJobs()
            }
        }
    }
}
</script>

<style scoped>

</style>