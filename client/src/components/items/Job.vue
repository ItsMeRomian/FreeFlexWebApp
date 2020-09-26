<template>
    <p class="border">Job Item!<br>
    current selected: {{item}}
    </p>
</template>

<script>
    export default {
        name: "Job",
        props: {
            item: Number
        }
    }
</script>

<style scoped>

</style>