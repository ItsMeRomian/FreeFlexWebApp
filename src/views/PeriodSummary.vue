<template>
    <h1>Viewing all jobs from period {{$route.params.period_id}}</h1>
    <div class="row">
        <div class="col">
            <label for="inputEmail4">Sorteer op:</label>
            <select id="inputEmail4" name="wayOfTravel" required="required" class="form-control custom-select" v-model="orderBy">
                <option selected value="title">title</option>
                <option value="period">period</option>
                <option value="date">date</option>
                <option value="rate">rate</option>
                <option value="wayOfTravel">wayOfTravel</option>
            </select>
        </div>
        <div class="col">
            <label for="inputPassword4">Filter op periode:</label>

            <div class="input-group mb-3">
                <div class="input-group-prepend">
                    <span class="input-group-text" @click="goBack()">≪</span>
                </div>
                <input v-model="selectedPeriod" id="inputPassword4" class="form-control" disabled>
                <div class="input-group-append">
                    <span class="input-group-text" @click="goForward()">≫</span>
                </div>
            </div>
        </div>
        <div class="col-4"></div>
        <div class="col-4">
            <div class="card text-white bg-secondary mb-1 text-center">
                <div class="card-header">
                    <span class="float-left display-6">Summery of {{jobListValues.length}} job<span v-if="jobListValues.length !== 1">s</span></span>
                </div>
                <div class="card-body" v-if="this.totals.count !== 0">
                    <table>
                        <tr>
                            <td><b>{{totals.workedHours}}</b></td>
                            <td>hours worked.<br></td>
                        </tr>
                        <tr>
                            <td><b>{{totals.averageHourly}}</b></td>
                            <td>average hourly.<br></td>
                        </tr>
                        <tr>
                            <td><b>{{totals.madeMoney}}</b></td>
                            <td>money made.<br></td>
                        </tr>
                        <tr>
                            <td><b>{{totals.BTW}}</b></td>
                            <td>tax.<br></td>
                        </tr>
                        <tr>
                            <td><b>{{totals.madeKMs}}</b></td>
                            <td>made kilometers.<br></td>
                        </tr>
                    </table>
                </div>
                <div class="card-body text-center" v-else>
                    <span @click="getTotals" class="btn btn-info mx-auto text-light">Get totals</span>
                </div>
            </div>
        </div>
    </div>
    <ListJobs :orderBy="orderBy" :filterPeriod="this.$route.params.period_id" @emitJobs="jobListValues = $event"/>
</template>

<script>
    import ListJobs from "@/components/ListJobs.vue";
    import {PeriodCalculator} from "@/lib/PeriodCalculator";
    import {JobSummary} from "../lib/JobSummary";

    export default {
        name: 'PeriodSummary',
        components: {
            ListJobs
        },
        data() {
            return {
                orderBy: "title",
                jobListValues: [],
                selectedPeriod: this.$route.params.period_id,
                periods:[],
                totals: {}
            }
        },
        mounted() {
            this.getTotals()
        },
        methods: {
            changeRoute() {
                this.$router.push({path:'/periodsummary/' + this.selectedPeriod})
            },
            getTotals() {
                this.totals = new JobSummary(this.jobListValues).getTotals()
                console.log("RAN")
            },
            goBack() {
                this.selectedPeriod = new PeriodCalculator(new Date()).previousPeriod(this.selectedPeriod)
                this.changeRoute()
                this.getTotals()
            },
            goForward() {
                this.selectedPeriod = new PeriodCalculator(new Date()).nextPeriod(this.selectedPeriod)
                this.changeRoute()
                this.getTotals()
            }
        },
        watch: {
            jobListValues: function() {
                this.getTotals()
            }
        }
    }
</script>
