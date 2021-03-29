<template>
    <div class="card mb-1" @click="linkToJob" style="cursor:pointer;">
        <div class="card-header">
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
                <i class="bi bi-clock"></i>{{job.calculator.formatTime().format('Do MMMM') }} · {{job.start}} - {{job.end}} ({{job.calculator.getWorkedHours().toFixed(2)}}) <br>
                <i class="bi bi-cup-straw"></i> {{job.pauze}} <br>
                <i class="bi bi-cash"></i>Voor € {{job.rate}} p/u<br>
                <i class="bi bi-cash-stack"></i>€ {{job.calculator.getExclBTW().toFixed(2)}}<br>
                <span class="btn btn-success">STATUS</span>
                <span class="btn btn-success mx-1">STATUS</span>
                <span class="btn btn-danger">STATUS</span>
            </span>
            <img src="../assets/map-placeholder.png" class="float-end">
        </div>
    </div>
</template>

<script>

    export default {
        name: "Job",
        data(){
            return {}
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