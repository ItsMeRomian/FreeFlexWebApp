<template>
    <div v-if="jobs.length">
        <div v-if="showFew !=='false' && !showMore">
            <div v-for="job in jobs.slice(0,5)" :key="job.id">
                <Job :job="job"/>
            </div>
            <button @click="showMore = true" class="btn btn-success">Show More</button>
        </div>
        <div v-if="showMore || showFew==='false'">
            <div v-for="job in jobs" :key="job.id">
                <Job :job="job"/>
            </div>
        </div>
    </div>
    <div v-else>
        No jobs...<br>
        <span class="btn btn-info" @click="getData()">Refresh</span>
    </div>
</template>

<script>
import Job from "@/components/Job.vue";
import {CalculateJob} from "@/lib/CalculateJob";

export default {
    name: "ListJobs",
    components: {
        Job
    },
    emits: ["emitJobs"],
    props: [
        'orderBy',
        'filterPeriod',
        'filterState',
        'flip',
        'showFew'
    ],
    data() {
        return {
            jobs: [],
            showMore: false,
        }
    },
    async mounted() {
        this.jobs = this.$store.state.jobs
        this.jobs.map(job=>job.calculator=new CalculateJob(job))
        this.jobs = this.jobs.slice().sort((a,b) => {
            return a.calculator.getDate().getTime() - b.calculator.getDate().getTime()
        })
        this.doFilterState()
        this.emitJobs()
    },
    methods: {
        async getData() {
            return this.$store.state.jobs
        },
        emitJobs() {
            if (!this.showMore && this.showFew !== "false") {
                this.$emit('emitJobs', this.jobs.slice(0,5));
            } else {
                this.$emit('emitJobs', this.jobs);
            }
        },
        sort: function() {
            if (this.orderBy === "date") {
                this.jobs = this.jobs.slice().sort((a,b) => {
                    return a.calculator.getDate().getTime() - b.calculator.getDate().getTime()
                })
            }
            else if (this.orderBy === "title") {
                this.jobs.sort((a, b) => a.title.localeCompare(b.title));
            }
            else if (this.orderBy === "rate") {
                this.jobs = this.jobs.slice().sort((a,b) => {
                    return b.rate - a.rate
                })
            }
            else if (this.orderBy === "rating") {
                this.jobs.sort((a, b) => {
                    if (a.rating && b.rating) { //Some jobs may not have a rating yet.
                        return a.rating.localeCompare(b.rating);
                    }
                });
            }
            else if (this.orderBy === "hours") {
                this.jobs = this.jobs.slice().sort((a, b) => {
                    return b.calculator.getWorkedHours() - a.calculator.getWorkedHours();
                });
            }
            else if (this.orderBy === "money") {
                this.jobs = this.jobs.slice().sort((a, b) => {
                    return b.calculator.getExclBTW() - a.calculator.getExclBTW();
                });
            }
        },
        doFilterPeriod: function() {
            this.jobs = this.$store.state.jobs
            if (this.filterPeriod) {
                this.jobs = this.jobs.filter(job => job.period === this.filterPeriod)
                this.emitJobs()
            }
        },
        doFilterState: function() {
            this.jobs = this.$store.state.jobs
            if (this.filterState) {
                this.jobs = this.jobs.filter(job => {
                    return job.calculator.getJobStatus() === this.filterState;
                })
                this.emitJobs()
            }
        }
    },
    watch: {
        showMore: function() {
            this.emitJobs()
        },
        orderBy: function() {
            this.sort()
        },
        flip: function() {
            this.jobs.reverse()
        },
        filterPeriod: function() {
            this.doFilterPeriod()
        },
        filterState: function() {
            this.doFilterState()
        }
    }
}
</script>

<style scoped>

</style>