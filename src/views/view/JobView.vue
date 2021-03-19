<template>
    <div class="container-fluid">
        Job VIEwW {{$route.params.id}}
        <div class="row">
            <div class="col">
                <h1>JOB</h1>
                <pre>{{job}}</pre>
            </div>
            <div class="col">
                <b>Job Title: (click to edit)</b>
                <ClickToEdit :value="job.title" @changedData="newValues.title = $event"/>

                <b>Job rate: (click to edit)</b>
                <ClickToEdit :value="job.rate" @changedData="newValues.rate = $event"/>

                <b>wayOfTravel: (click to edit)</b>
                <ClickToEdit :value="job.wayOfTravel" @changedData="newValues.wayOfTravel = $event"/>

                <b>address: (click to edit)</b>
                <ClickToEdit :value="job.address" @changedData="newValues.address = $event"/>

                <b>start: (click to edit)</b>
                <ClickToEdit :value="job.start" @changedData="newValues.start = $event"/>

                <pre>{{newValues}}</pre>
                <span class="btn" @click="setNewValues">Submit new values</span>
            </div>
            <div class="col">
                <h1>Expenses (if any)</h1>
                <pre>{{expenses}}</pre>
                <span class="btn"><router-link :to="'/create/expense/' + $route.params.id">MAAK EXPENSE GELINKT AAN DEZE JOB</router-link></span><br>
                <router-link :to="'/view/client/' + job.client">CLIENT {{job.client}}</router-link>
            </div>
        </div>
    </div>
</template>

<script>
    import { db } from "@/lib/Firebase";
    import {CalculateJob} from "../../lib/CalculateJob";
    import ClickToEdit from "../../components/ClickToEdit";

    export default {
        name: "JobView",
        components: {ClickToEdit},
        data() {
            return {
                job: {},
                newValues: {},
                expenses: [],
                user: db.collection('workers').doc(this.$store.state.loggedInUser.xR)

            }
        },
        async mounted() {
            await this.getJob();
            await this.getExpenses();
        },
        methods: {
            async getJob() {
                const jobRef = await this.user.collection('jobs').doc(this.$route.params.id).get()
                if (jobRef.exists) {
                    this.job = jobRef.data()
                    this.$toast.info(`Found Job ${jobRef.id}`)
                } else {
                    this.$toast.error("Job not found!")
                }
            },
            async getExpenses() {
                const expensesRef = await this.user.collection('jobs').doc(this.$route.params.id).collection('expenses').get();
                expensesRef.forEach(doc => {
                    this.expenses.push({
                        id: doc.id,
                        data: doc.data()
                    });
                })
            },
            async setNewValues() {
                const newValuesRef = this.user.collection('jobs').doc(this.$route.params.id);
                await newValuesRef.set(this.newValues, { merge: true });
                this.$toast.success("Done!")
            }
        }
    }
</script>

<style scoped>

</style>