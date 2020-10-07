<template>
    <div class="itemAdd container">
        <JobView v-if="$route.params.type === 'job'"></JobView>
        <WorkerView v-if="$route.params.type === 'worker'"></WorkerView>
        <OpdrachtgeverView v-if="$route.params.type === 'opdrachtgever'"></OpdrachtgeverView>
    </div>
</template>

<script>
    import JobView from "./Job/JobView";
    import WorkerView from "./Worker/WorkerView";
    import OpdrachtgeverView from "./Opdrachtgever/OpdrachtgeverView";

    export default {
        name: "ItemView",
        components: {
            JobView,
            OpdrachtgeverView,
            WorkerView
        }
    }
</script>

<style scoped>

</style>