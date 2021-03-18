<template>
    <pre>{{expense}}</pre>
</template>

<script>
    export default {
        name: "Expense",
        data(){
            return {
                expense: this.expense
            }
        },
        props: {
            expense: Object
        }
    }
</script>

<style scoped>

</style>