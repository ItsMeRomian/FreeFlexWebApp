<template>
    <router-link :to="'/view/job/'+ expense.data.linkedToJob +'/expense/' + expense.id"><pre>{{expense}}</pre></router-link>
    <span @click="deleteExpense()" class="btn btn-danger">Delete Expense</span>
</template>

<script>
    export default {
        name: "Expense",
        emits: ["deleteExpense"],
        data(){
            return {}
        },
        props: {
            expense: Object
        },
        methods: {
            deleteExpense() {
                this.$emit('deleteExpense', this.expense.id);
            }
        },
    }
</script>

<style scoped>

</style>