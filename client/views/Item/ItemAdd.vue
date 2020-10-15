<template>
    <div class="itemAdd" style="border: solid">
        Hello
        <JobAdd v-if="$route.params.type === 'job'"></JobAdd>
        <OpdrachtgeverAdd v-else-if="$route.params.type === 'opdrachtgever'"></OpdrachtgeverAdd>
        <WorkerAdd v-else-if="$route.params.type === 'worker'"></WorkerAdd>
        <ExpenseAdd v-else-if="$route.params.type === 'expense'"></ExpenseAdd>
        <p v-else>Hmm, i cant seem to find what your looking for</p>
    </div>
</template>

<script>
    //This module loads the correct "add" module for each addable component.

    import JobAdd from "./Job/JobAdd";
    import OpdrachtgeverAdd from "./Opdrachtgever/OpdrachtgeverAdd";
    import WorkerAdd from "./Worker/WorkerAdd";
    import ExpenseAdd from "../Expense/ExpenseAdd";

    export default {
        name: "ItemAdd",
        components: {
            JobAdd,
            OpdrachtgeverAdd,
            WorkerAdd,
            ExpenseAdd
        }
    }
</script>

<style scoped>

</style>