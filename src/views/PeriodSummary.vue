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
            <input v-model="selectedPeriod" id="inputPassword4" class="form-control" placeholder="2020Q2">
        </div>
        <div class="col-4"></div>
        <div class="col-4">
            <div class="card mb-1">
                <div class="card-header">
                    <span class="float-left display-6">Summery of {{totals.count}} job<span v-if="totals.count !== 1">s</span></span>
                </div>
                <div class="card-body">
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
               
            </div>
        </div>
    </div>
    <ListJobs :orderBy="orderBy" :filterPeriod="this.$route.params.period_id" @emitJobs="jobListValues = $event"/>
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
                orderBy: "title",
                jobListValues: [],
                selectedPeriod: this.$route.params.period_id,
                periods:[],
                totals: {}
            }
        },
        mounted() {
            const periodCalculator = new PeriodCalculator(new Date())
            let period = periodCalculator.today()
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
                    this.totals.madeMoney += job.calculator.getExclBTW()

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
