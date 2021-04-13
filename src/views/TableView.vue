<template>
    <div class="row">
        <div class="col">
            <table class="table text-white text-center">
                <thead>
                <tr>
                    <th>STATE</th>
                    <th>ID</th>
                    <th>NAME</th>
                    <th>CLIENT</th>
                    <th>DATE</th>
                    <th>PERIOD</th>
                    <th>TIME</th>
                    <th>ADDRESS</th>
                    <th>RATE</th>
                    <th>Facto</th>
                    <th>Excl. BTW</th>
                    <th>BTW</th>
                    <th>Incl. BTW</th>
                    <th>KM's</th>
                </tr>
                </thead>
                <tbody>
                    <tr v-for="job in jobs" :key="job.id" >
                        <td>
                            <span class="badge bg-success" v-if="job.isPayed">Payed</span>
                            <span class="badge bg-danger" v-if="!job.isPayed">Payed</span>
                            <div class="mx-1"></div>
                            <span class="badge bg-success" v-if="job.isCheckedOut">Checked Out</span>
                            <span class="badge bg-danger" v-if="!job.isCheckedOut">Checked Out</span>
                        </td>
                        <td><router-link :to="'/view/job/'+job.id">{{job.id.substring(0,5)}}</router-link>...</td>
                        <td>{{job.title}}</td>
                        <td>{{job.clientName}}</td>
                        <td :class="{ 'bg-success': job.calculator.isJobInPast(), 'bg-warning': !job.calculator.isJobInPast() }">{{job.date}}</td>
                        <td>{{job.period}}</td>
                        <td>{{job.start}} - {{job.end}} ({{job.pauze}})</td>
                        <td>{{job.address}}</td>
                        <td>{{job.rate}}</td>
                        <td>{{job.factoringPercentage}}%</td>
                        <td>{{job.calculator.getExclBTW().toFixed(2)}}</td>
                        <td>{{job.calculator.getBTW().toFixed(2)}}</td>
                        <td>{{job.calculator.getInclBTW().toFixed(2)}}</td>
                        <td>{{job.calculator.getKMs()}}km's</td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>

<script>
    import {CalculateJob} from "../lib/CalculateJob";

    export default {
        name: "TableView",
        data() {
            return {
                jobs: []
            }
        },
        async mounted() {
            this.jobs = this.$store.state.jobs
            this.jobs.map(job => job.calculator = new CalculateJob(job))
        }
    }
</script>

<style scoped>

</style>