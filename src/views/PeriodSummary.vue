<template>
    <h1>Viewing all jobs from period {{$route.params.period_id}}</h1>
    <p>Total Jobs: {{jobListValues.length}} </p>
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

<script lang="ts">
    import {defineComponent} from 'vue';
    import ListJobs from "@/components/ListJobs.vue";
    import {PeriodCalculator} from "@/lib/PeriodCalculator";

    export default defineComponent({
        name: 'PeriodSummary',
        components: {
            ListJobs
        },
        data() {
            return {
                orderBy: "",
                jobListValues: [],
                selectedPeriod: this.$route.params.period_id,
                periods: new Array<string>(),
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
            this.periods.push(this.$route.params.period_id as string)
            this.periods = beforeArray.concat(this.periods)
            this.periods = this.periods.concat(afterArray.reverse())
        },
        methods: {
            changeRoute() {
                this.$router.push({path:'/periodsummary/' + this.selectedPeriod})
            }
        }
    });
</script>
