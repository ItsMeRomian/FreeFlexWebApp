<template>
    <vue3-chart-js
            :id="lineChart.id"
            :type="lineChart.type"
            :data="lineChart.data"
    />
</template>

<script>
    import Vue3ChartJs from '@j-t-mcc/vue3-chartjs'
    import {CalculateJob} from "@/lib/CalculateJob";

    export default {
        name: 'ChartWorkedJobs',
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
            props.jobs.map(job=>job.calculator=new CalculateJob(job))
            const incBTW = []
            const BTW = []
            const exclBTW = []
            const labels = []
            props.jobs.forEach((job) => {
                incBTW.push(job.calculator.getInclBTW())
                exclBTW.push(job.calculator.getExclBTW())
                labels.push(job.title+" ("+job.date+")")
                BTW.push(job.calculator.getBTW())
            })
            const lineChart = {
            id: 'line',
            type: 'line',
            data: {
                labels: labels,
                datasets: [
                    {
                        label: "Inc BTW",
                        backgroundColor: ['#41b8b4'],
                        data: BTW
                    },
                    {
                        label: "Excl BTW",
                        backgroundColor: ['lightblue'],
                        data: exclBTW
                    },
                    {
                        label: "BTW",
                        backgroundColor: ['#41B883'],
                        data: incBTW
                    },

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