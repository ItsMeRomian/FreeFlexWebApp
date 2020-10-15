<template>
    <div>
        <h1>WorkerView</h1>
        <worker :item='this.$route.params.id' variant="big"></worker>
    </div>
</template>

<script>
    import Worker from "../../../src/components/items/Worker";
    export default {
        name: "OpdrachtgeverView",
        components: {Worker}
    }
</script>

<style scoped>

</style>