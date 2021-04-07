<template>
    <div class="card text-white bg-secondary mb-1"  style="cursor:pointer;" >
        <div class="card-header" @click="linkToJob">
            <span class="float-left display-6">{{job.title}}</span>
            <span class="float-end star-holder">
                <i class="bi bi-star-fill"></i>
                <i class="bi bi-star-fill"></i>
                <i class="bi bi-star-fill"></i>
                <i class="bi bi-star-fill"></i>
                <i class="bi bi-star-half"></i>
            </span>
        </div>
        <div class="card-body">
            <span class="d-inline-block">
                <i class="bi bi-clock"></i>{{calculator.formatTime().format('Do MMMM') }} · {{job.start}} - {{job.end}} ({{calculator.getWorkedHours().toFixed(2)}}) <br>
                <i class="bi bi-cup-straw"></i> {{job.pauze}} <br>
                <i class="bi bi-cash"></i>Voor € {{job.rate}} p/u<br>
                <i class="bi bi-cash-stack"></i>€ {{calculator.getExclBTW().toFixed(2)}}<br>
            </span>
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

    export default {
        name: "Job",
        data: function() {
            return {
                calculator: new CalculateJob(this.$props.job)
            }
        },
        mounted() {
            if (this.job.rating) {
                console.log(Math.floor(this.job.rating))
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
    span .bi {
    margin-right: 1em;
        font-size: 1.25em
}
.star-holder .bi{
    margin-right: 0.25em;
    font-size: 1.75em
}
</style>