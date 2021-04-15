<template>
    <div class="card mb-1"  style="cursor:pointer; background: #F7F7FF; color: #3D3D3D" >
        <div class="card-header" @click="linkToJob">
            <span class="float-left display-6">{{job.title}}</span>
            <Stars :rating="job.rating" class="float-end"/>
        </div>
        <div class="card-body">
            <table class="d-inline-block" style="font-size: 1.5rem">
                <tr>
                    <td><i class="bi bi-clock"></i></td>
                    <td class="mx-3">{{calculator.formatTime().format('DD MMMM \'YY') }} · {{job.start}} - {{job.end}} ({{calculator.getWorkedHours().toFixed(2)}})</td>
                </tr>
                <tr>
                    <td><i class="bi bi-cup-straw"></i></td>
                    <td>{{job.pauze}}</td>
                </tr>
                <tr>
                    <td><i class="bi bi-cash"></i></td>
                    <td>{{formatter.money(job.rate)}} Hourly</td>
                </tr>
                <tr>
                    <td><i class="bi bi-cash-stack"></i></td>
                    <td>{{formatter.money(calculator.getExclBTW())}}</td>
                </tr>
            </table>
            <img src="../assets/map-placeholder.png" class="float-end">
        </div>
        <div class="card-footer">
            <span class="badge bg-info" v-if="calculator.getJobStatus() === 4">Not worked yet</span>
            <span class="badge bg-info" v-if="calculator.getJobStatus() === 3">Ready to checkout</span>
            <span class="mx-2 badge bg-danger" v-if="calculator.getJobStatus() === 2">waiting for payment</span>
            <span class="badge bg-success" v-if="calculator.getJobStatus() === 1">checked out</span>
            <span class="mx-1"/>
            <span class="badge bg-success" v-if="calculator.getJobStatus() === 1">paid</span>
            <span class="badge bg-warning" v-if="calculator.getJobStatus() === 0">Invalid state!</span>
            <span class="badge bg-dark float-end">{{job.period}}</span>
        </div>
    </div>
</template>

<script>

    import {CalculateJob} from "@/lib/CalculateJob";
    import Stars from "@/components/Stars";
    import {Formatter} from "@/lib/Formatter";

    export default {
        name: "Job",
        components: {Stars},
        data: function() {
            return {
                calculator: new CalculateJob(this.$props.job),
                formatter: new Formatter
            }
        },
        props: {
            job: Object
        },
        methods: {
            linkToJob() {
                this.$router.push("/view/job/"+this.job.id)
            }
        }
    }
</script>

<style scoped>
    .bi {
        margin-right: .5rem;
    }
</style>