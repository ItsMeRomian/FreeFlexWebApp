<template>
    <div>
        <Opdrachtgever variant="big" :item="this.$route.params.id"></Opdrachtgever>
    </div>
</template>

<script>
    import Opdrachtgever from "../../../src/components/items/Opdrachtgever";
    export default {
        name: "OpdrachtgeverView",
        components: {Opdrachtgever}
    }
</script>

<style scoped>

</style>