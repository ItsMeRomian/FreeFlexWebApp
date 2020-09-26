<template>
    <div>
        <p>Home!</p>
        <upcomming-job></upcomming-job>
        <br>
        <list-of-jobs></list-of-jobs>
    </div>
</template>

<script>
    import UpcommingJob from "../../src/components/UpcommingJob";
    import ListOfJobs from "../../src/components/ListOfJobs";
    export default {
        name: "HomeView",
        components: {
            ListOfJobs,
            UpcommingJob
        }
    }
</script>

<style scoped>

</style>