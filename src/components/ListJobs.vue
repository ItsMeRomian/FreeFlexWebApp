<template>
    <div v-for="job in jobs" :key="job.id">
        <Job :job="job"/>
    </div>
</template>

<script>
import {CalculateJob} from '@/lib/CalculateJob';
import {db} from "@/lib/Firebase";
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
        if (this.filterPeriod) {
            await this.getSpecificPeriodData(this.filterPeriod)
        } else {
            await this.getData()
        }
        this.emitJobs()
    },
    methods: {
        async getData(orderBy = "date") {
            const user = db.collection('workers').doc(this.$store.state.firebaseAccount.userID);
            const ref = await user.collection('jobs').orderBy(orderBy).get();
            ref.forEach(doc => {
                const job = doc.data()
                job.id = doc.id
                job.calculator = new CalculateJob(job)
                this.jobs.push(job) // TODO: Fix
            })
        },
        async getSpecificPeriodData(period, orderBy = "date") {
            const user = db.collection('workers').doc(this.$store.state.firebaseAccount.userID);
            const ref = await user.collection('jobs').where('period', '==', period).orderBy(orderBy).get();
            ref.forEach(doc => {
                const job = doc.data()
                job.id = doc.id
                job.calculator = new CalculateJob(job)
                this.jobs.push(job) // TODO: Fix
            })
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