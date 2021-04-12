<template>
    <vue3-chart-js
            :id="lineChart.id"
            :type="lineChart.type"
            :data="lineChart.data"
    />
</template>

<script>
    import Vue3ChartJs from '@j-t-mcc/vue3-chartjs'
    import {JobSummary} from "../../lib/JobSummary";

    export default {
        name: 'ChartClients',
        components: {
            Vue3ChartJs,
        },
        data() {
            return {
                hello: "hi!",
            }
        },
        props: {
            user: Object,
            jobs: Object
        },
        setup (props) {
            const jobSummary = new JobSummary(props.jobs).getTotals()
            const timesWorked = []
            const labels = []
            jobSummary.mostFrequentClients.forEach((client) => { //:TODO: there is probably a better way to do this
                timesWorked.push(client.frequency)
                labels.push(client.letter)
            })
            const lineChart = {
            id: 'line',
            type: 'doughnut',
            data: {
                labels: labels,
                datasets: [
                    {
                        backgroundColor: ['rgba(255, 99, 132)', 'rgba(255, 159, 64)', 'rgba(255, 205, 86)', 'rgba(75, 192, 192)', 'rgba(54, 162, 235)', 'rgba(153, 102, 255)', 'rgba(201, 203, 207)'],
                        data: timesWorked
                    }
                ]
            }
        }
        return {
            lineChart: lineChart,
        }
    },
    }
</script>

<style scoped>

</style>