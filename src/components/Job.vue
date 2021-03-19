<template>
    <div class="card-header">
        <router-link :to="'/view/job/' + job.id"><h3 class="float-left">{{job.title}} voor opdrgvr</h3></router-link>
        <h3 class="float-right">€ {{job.calculator.getMadeMoney()}}</h3>
    </div>
    <div class="card-body">
        <p class="card-text">
            Op {{job.date}} van {{job.start}} tot {{job.end}} met {{job.pauze}} pauze ({{job.calculator.getWorkedHours()}})<br>
            <a target="_blank" :href="'https://maps.google.com/?q=' + job.address">{{job.address}}</a><br>
            Voor € {{job.rate}} p/u</p>
        <router-link :to="'/view/client/'+job.client">{{job.client}}</router-link>
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
        }
    }
</script>

<style scoped>

</style>