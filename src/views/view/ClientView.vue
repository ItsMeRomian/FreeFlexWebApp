<template>
    <div v-if="client && totals">
        <div class="row">
            <div class="col">
                <strong>CLIENT OVERVIEW</strong>
                <h2 class="display-6">{{client.name}}</h2>
                <h4>You have worked {{totals.count}}
                    <span v-if="totals.count === 1"> time for this client.</span>
                    <span v-else> times for this client</span>
                </h4>
            </div>
        </div>
        <div class="row">
            <div class="col-9">
                <div v-for="job in jobs" :key="job.id">
                    <Job :job="job"/>
                </div>
            </div>
            <div class="col-3">
                <div class="card bg-secondary">
                    <div class="card-header">
                        <span class="display-6">Overview</span>
                    </div>
                    <div class="card-body">
                        {{totals.count}} job<span v-if="totals.count!==1">s</span> worked<br>
                        {{formatter.hours(totals.workedHours)}} hours worked<br>
                        {{formatter.money(totals.averageHourly)}} average hourly<br>
                        {{formatter.money(totals.madeMoney)}} made total<br>
                    </div>
                    <div class="card-footer">
                        <span class="btn btn-danger mx-1" @click="deleteClient()">delete {{client.name}}</span>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div v-else>
        <Loader full-page="true"/>
    </div>
</template>

<script>
    import {CalculateJob} from '@/lib/CalculateJob';
    import { db } from "@/lib/Firebase";
    import Job from "../../components/Job";
    import {JobSummary} from "../../lib/JobSummary";
    import {Formatter} from "../../lib/Formatter";
    import Loader from "../../components/Loader";

    export default {
        name: "ClientView",
        components: {Loader, Job},
        data() {
            return {
                client: {},
                userRef: db.collection('workers').doc(this.$store.state.firebaseAccount.userID),
                jobs: [],
                totals: [],
                formatter: new Formatter
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
                    this.client = ref.data()
                    this.client.id = ref.id
                    this.$toast.info(`Found Client ${ref.id}`)
                } else {
                    this.$toast.error("Client not found!")
                }
            },
            async getJobs() {
                this.jobs = this.$store.state.jobs.filter((job) => job.client === this.client.id)
                this.jobs.map(job=>job.calculator=new CalculateJob(job))
            },
            async deleteClient() {
                if (this.totals.count === 0) {
                    this.userRef.collection("clients").doc(this.client.id).delete().then(() => {
                        this.client = {}
                        this.$toast.info("Document successfully deleted!");
                        this.$store.dispatch('refreshData')
                        this.$toast.info(`Refreshing data...`)
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