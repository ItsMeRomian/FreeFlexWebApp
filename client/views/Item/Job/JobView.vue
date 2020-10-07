<template>
    <div>
        <job :item='this.$route.params.id' variant="big"></job>
    </div>
</template>

<script>
    import Job from "../../../src/components/items/Job";
    export default {
        name: "JobView",
        components: {
            Job
        }
    }
</script>

<style scoped>

</style>