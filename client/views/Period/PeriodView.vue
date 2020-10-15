<template>
    <div class="container">
        <h2>Current period</h2>
        <div v-if="retrievedValues.length > 0">
            <h4>You've worked {{jobs.length}} <span v-if="jobs.length > 1">jobs</span><span v-else>job</span> this period.</h4>
            <h4>You've made {{totals['totalExpenses']}} <span v-if="totals['totalExpenses'] > 1">expense</span><span v-else>expenses</span> this period.</h4>

            <table>
                <tr>
                        <td>You've made </td>
                        <td class="pl-2 pr-2 text-success">&euro; {{totals['totalExclBTW'].toFixed(2)}}</td>
                        <td> this period. Nice!</td>
                </tr>
                <tr>
                        <td >You owe the overheid</td>
                        <td class="pl-2 text-danger">&euro; {{totals['totalBTWWithCosts'].toFixed(2)}}</td>
                        <td>We've reducted made costs off this value.</td>
                </tr>
                <tr>
                        <td>Total on bank account</td>
                        <td class="pl-2">&euro; {{totals['totalIncBTW'].toFixed(2)}}</td>
                </tr>
            </table>
            <br><br>
            <table>
                <tr>
                    <td>1a./5a.	Leveringen/diensten belast met hoog tarief</td>
                    <td class="pl-2" data-toggle="tooltip" data-placement="top" title="Dit is eigelijk uurloon*uren. het bedrag waarvoor je werkt.">&euro; {{Math.floor(totals['jobTotalExcl'])}}</td>
                    <td class="pl-2" data-toggle="tooltip" data-placement="top" title="2e bedrag is de btw die je 'erbij' krijgt en weer terug moet geven aan de overheid">&euro; {{Math.floor(totals['jobBTW'])}}</td>
                </tr>
                <tr>
                    <td>5b.	Voorbelasting</td>
                    <td></td>
                    <td class="pl-2" data-toggle="tooltip" data-placement="top" title="Dit is alle btw die je hebt betaald, en weer terugkrijgt van de overheid. Dus stel je hebt 21% betaald over werkkleding, dan komt dat hier te staan en dat krijg je weer terug.">&euro; {{Math.floor((totals['jobBTW'] - totals['totalBTWWithCosts']))}}</td>
                </tr>
                <tr>
                    <td>5c.	Subtotaal (rubriek 5a min 5b)</td>
                    <td class="pl-2">&euro; {{Math.floor(totals['jobTotalExcl'])}}</td>
                    <td class="pl-2" data-toggle="tooltip" data-placement="top" title="Dit is het eindbedrag wat je overmaakt naar de overheid. Alle btw die je hebt 'gekregen' en weer terug moet betalen, min de btw die je hebt 'voorgeschoten' en weer terug krijgt.">&euro; {{Math.floor(totals['totalBTWWithCosts'])}}</td>
                </tr>
            </table>
        </div>
        <p v-else class="btn btn-primary" v-on:click="calcumate">Calculate current period</p>


        <div v-for="(job) in jobs" :key="job.job_id">
            <Job :item="job.job_id" variant="small" :ref="job.job_id"></Job>
        </div>
    </div>
</template>

<script>
    import axios from "axios";
    import Job from "../../src/components/items/Job";

    export default {
        name: "PeriodView",
        components: {
            Job
        },
        data () {
            return {
                jobs: [],
                retrievedValues: [],
                totals: {}
            }
        },
        async mounted() {
            if (this.$route.params.period === "current") {
                let current = new Date()
                console.log(current.getTime())
                let period1Start = new Date('01-01')
                let period1End = new Date('31-03')
                //let lastDatePeriod1 = new Date('30-04')
                if (current >= period1Start && current <= period1End) { console.log("match! 1") }

                let period2Start = new Date('01-04')
                let period2End = new Date('01-06')
                //let lastDatePeriod2 = new Date('31-07')
                if (current >= period2Start && current <= period2End) { console.log("match! 1") }


                let period3Start = new Date('01-07')
                let period3End = new Date('01-09')
                //let lastDatePeriod3 = new Date('31-10')
                if (current >= period3Start && current <= period3End) { console.log("match! 1") }


                let period4Start = new Date('01-10')
                console.log(period4Start)
                let period4End = new Date('31-12')
                //let lastDatePeriod4 = new Date('31-01')
                if (current >= period4Start && current <= period4End) { console.log("match! 1") }

            }

            await axios.post('http://192.168.1.200/YoungOnes/API/Jobs/allFromPeriod', {
                "id": this.$route.params.period
            })
                .then(async (response) => {
                    this.jobs = response.data.return
                })
                .catch()

        },
        methods: {
            calcumate: function () {
                //Loop over jobs in this period
                for (let item in this.$refs) {
                    //Get numbers
                    let totalExclBTW = (this.$refs[item][0].job.totalExclBTW)
                    let totalBTWWithCosts = (this.$refs[item][0].job.totalBTWWithCosts)
                    let totalIncBTW = (this.$refs[item][0].job.totalIncBTW)
                    totalExpenses = this.$refs[item][0].expenses.length

                    let jobTotalInc = (this.$refs[item][0].job['121'])
                    let jobTotalExcl = (this.$refs[item][0].job['100'])
                    let jobBTW = (this.$refs[item][0].job['21'])

                    //Push number to local array
                    this.retrievedValues.push([totalExclBTW, totalBTWWithCosts, totalIncBTW, totalExpenses, [jobTotalExcl, jobTotalInc, jobBTW]])
                }

                let totalExclBTW = 0
                let totalBTWWithCosts = 0
                let totalIncBTW = 0
                let totalExpenses = 0
                let jobTotalInc = 0
                let jobTotalExcl = 0
                let jobBTW = 0
                //Calculate totals of jobs
                for (let item in this.retrievedValues) {
                    totalExclBTW += parseFloat(this.retrievedValues[item][0])
                    totalBTWWithCosts += this.retrievedValues[item][1]
                    totalIncBTW += this.retrievedValues[item][2]
                    totalExpenses += this.retrievedValues[item][3]

                    jobTotalInc += this.retrievedValues[item][4][1]
                    jobTotalExcl += this.retrievedValues[item][4][0]
                    jobBTW += this.retrievedValues[item][4][2]
                }
                this.totals['totalExclBTW'] = totalExclBTW
                this.totals['totalBTWWithCosts'] = totalBTWWithCosts
                this.totals['totalIncBTW'] = totalIncBTW
                this.totals['totalExpenses'] = totalExpenses

                this.totals['jobTotalInc'] = jobTotalInc
                this.totals['jobTotalExcl'] = jobTotalExcl
                this.totals['jobBTW'] = jobBTW
            }
        }
    }
</script>

<style scoped>

</style>