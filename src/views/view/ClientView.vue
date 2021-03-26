<template>
    Client VIEwW {{$route.params.id}}
    <pre>{{ref}}</pre>
    <span class="btn btn-danger" @click="deleteClient()">DELETE {{ref.name}}</span>
    <span class="btn btn-info" @click="getJobs()">getJobs {{ref.name}}</span>
    <div v-for="job in jobs" :key="job.id">
        <Job :job="job"/>
    </div>
</template>

<script>
    import {CalculateJob} from '@/lib/CalculateJob';
    import { db } from "@/lib/Firebase";
    import Job from "../../components/Job";

    export default {
        name: "ClientView",
        components: {Job},
        data() {
            return {
                ref: {},
                userRef: db.collection('workers').doc(this.$store.state.firebaseAccount.userID),
                jobs: [],
                jobCount: 0,
            }
        },
        async mounted() {
            await this.getClient()
            await this.getJobs()
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