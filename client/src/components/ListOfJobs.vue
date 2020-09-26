<template>
    <div class="border">
        <p>All Jobs here</p>
        <job item="2"></job>
        <job item="4"></job>
    </div>
</template>

<script>
    import Job from "./items/Job";
    export default {
        name: "ListOfJobs",
        components: {Job}
    }
</script>

<style scoped>

</style>