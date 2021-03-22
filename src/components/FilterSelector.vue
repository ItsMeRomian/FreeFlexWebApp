<template>
    <select v-model="input" @click="getClients" name="client" id="client">
        <option v-for="client in clients" :key='client.id' :value="client.id">{{client.name}}</option>
        <option value="makeClient" @click="this.$router.push('/create/client')">Maak client...</option>  <!-- TODO: maak dit werkend -->
    </select>
</template>

<script>
    export default {
        name: "FilterSelector",
        data() {
            return {
                input: {}
            }
        }
    }
</script>

<style scoped>

</style>