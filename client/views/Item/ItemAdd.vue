<template>
    <div class="itemAdd" style="border: solid">
        Hello
        <JobAdd v-if="$route.params.type === 'job'"></JobAdd>
        <OpdrachtgeverAdd v-if="$route.params.type === 'opdrachtgever'"></OpdrachtgeverAdd>
        <WorkerAdd v-if="$route.params.type === 'worker'"></WorkerAdd>
    </div>
</template>

<script>
    //This module loads the correct "add" module for each addable component.

    import JobAdd from "./Job/JobAdd";
    import OpdrachtgeverAdd from "./Opdrachtgever/OpdrachtgeverAdd";
    import WorkerAdd from "./Worker/WorkerAdd";

    export default {
        name: "ItemAdd",
        components: {
            JobAdd,
            OpdrachtgeverAdd,
            WorkerAdd
        }
    }
</script>

<style scoped>

</style>