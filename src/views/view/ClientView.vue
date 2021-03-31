<template>
    <div class="row">
        <div class="col">
            <h1>{{ref.name}}</h1>
            <h3>You have worked {{jobCount}}
                <span v-if="jobCount === 1"> time for this client.</span>
                <span v-else> times for this client</span>
            </h3>
        </div>
    </div>
    <div class="row">
        <div class="col-9">
            <div v-for="job in jobs" :key="job.id">
                <Job :job="job"/>
            </div>
        </div>
        <div class="col-3">
            <div class="card">
                <div class="card-header">
                    <span class="display-6">Overview</span>
                </div>
                <div class="card-body">
                    {{jobCount}} job<span v-if="jobCount!==1">s</span> worked<br>
                    {{totals.workedHours}} hours worked<br>
                    {{totals.averageHourly}} average hourly<br>
                    {{totals.madeMoney}} made total<br>
                </div>
                <div class="card-footer">
                    <span class="btn btn-danger mx-1" @click="deleteClient()">delete {{ref.name}}</span>
                    <span class="btn btn-info" @click="deleteClient()">something</span>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import {CalculateJob} from '@/lib/CalculateJob';
    import { db } from "@/lib/Firebase";
    import Job from "../../components/Job";
    import {JobSummary} from "../../lib/JobSummary";

    export default {
        name: "ClientView",
        components: {Job},
        data() {
            return {
                ref: {},
                userRef: db.collection('workers').doc(this.$store.state.firebaseAccount.userID),
                jobs: [],
                jobCount: 0,
                totals: []
            }
        },
        async mounted() {
            await this.getClient()
            await this.getJobs()
            this.totals = new JobSummary(this.jobs).getTotals()
        },
        methods: {
            async getClient() {
                const ref = await this.userRef.collection('clients').doc(this.$route.params.id).get()
                if (ref.exists) {
                    this.ref = ref.data()
                    this.ref.id = ref.id
                    this.$toast.info(`Found Client ${ref.id}`)
                } else {
                    this.$toast.error("Client not found!")
                }
            },
            async getJobs() {
                const jobs = await this.userRef.collection('jobs').where('client', '==', this.ref.id).get()
                let count = 0
                jobs.forEach(doc => {
                    count++
                    const job = doc.data()
                    job.id = doc.id
                    job.calculator = new CalculateJob(job)
                    this.jobs.push(job)
                })
                this.jobCount = count;
            },
            async deleteClient() {
                if (this.jobCount === 0) {
                    this.userRef.collection("clients").doc(this.ref.id).delete().then(() => {
                        this.ref = {}
                        this.$toast.info("Document successfully deleted!");
                    }).catch((error) => {
                        this.$toast.error(`Error removing document: ${error}`);
                    });
                } else {
                    this.$toast.error("This client has jobs!");
                }
            }
        }
    }
</script>

<style scoped>

</style>