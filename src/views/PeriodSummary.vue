<template>
    <h1>Viewing all jobs from period {{$route.params.period_id}}</h1>
    <p>Total Jobs: {{jobListValues.length}} <br>
        <span class="btn btn-success" @click="getTotals">get Totals</span>
    </p>
    <pre>{{this.totals}}</pre>
    <select v-on:change="changeRoute()" class="custom-select" v-model="selectedPeriod">
        <option v-for="period in periods" :key='period' :value="period">{{period}}</option>
    </select>
    <br><br>
    <select id="wayOfTravel" name="wayOfTravel" required="required" class="custom-select" v-model="orderBy">
        <option value="title">title</option>
        <option value="period">period</option>
        <option value="rate">rate</option>
        <option value="wayOfTravel">wayOfTravel</option>
    </select>
    <ListJobs :orderBy="orderBy" :filterPeriod="this.$route.params.period_id" @changedData="jobListValues = $event"/>
</template>

<script>
    import ListJobs from "@/components/ListJobs.vue";
    import {PeriodCalculator} from "@/lib/PeriodCalculator";

    export default {
        name: 'PeriodSummary',
        components: {
            ListJobs
        },
        data() {
            return {
                orderBy: "",
                jobListValues: [],
                selectedPeriod: this.$route.params.period_id,
                periods:[],
                totals: {
                    workedHours: 0,
                    averageHourly: 0,
                    madeMoney: 0,
                    BTW: 0,
                    madeKMs: 0,
                    workedClients: [],
                    mostWorked: {}
                }
            }
        },
        mounted() {
            const periodCalculator = new PeriodCalculator(new Date())
            let period = '2019Q3'
            const beforeArray = []
            const afterArray = []
            for(let i = 0; i < 5; i++) {
                period = (periodCalculator.nextPeriod(period))
                beforeArray.push(period)
            }
            for(let i = 0; i < 5; i++) {
                period = (periodCalculator.previousPeriod(period))
                afterArray.push(period)
            }
            this.periods.push(this.$route.params.period_id)
            this.periods = beforeArray.concat(this.periods)
            this.periods = this.periods.concat(afterArray.reverse())
        },
        methods: {
            changeRoute() {
                this.$router.push({path:'/periodsummary/' + this.selectedPeriod})
            },
            getTotals() {
                let hourly = 0

                this.jobListValues.forEach((job) => {
                    //Total worked hours
                    this.totals.workedHours += job.calculator.getWorkedHours()

                    //Average hourly rate
                    hourly += job.rate
                    this.totals.averageHourly = hourly / this.jobListValues.length

                    //Total made money
                    this.totals.madeMoney += job.calculator.getMadeMoney()

                    //Total BTW
                    this.totals.BTW += job.calculator.getBTW()

                    //Total KM's driven
                    this.totals.madeKMs += job.distance

                    //Sort clients by highest occurrence
                    this.totals.workedClients.push(job.clientName)

                    //TODO: TBA
                        //Count the expenses
                            //BTW
                            //Total money spent
                        //...
                })
                this.totals.workedClients.forEach((x) => { this.totals.mostWorked[x] = (this.totals.mostWorked[x] || 0)+1; });
            },

        }
    }
</script>
