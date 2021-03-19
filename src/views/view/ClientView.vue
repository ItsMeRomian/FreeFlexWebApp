<template>
    Client VIEwW {{$route.params.id}}
    <pre>{{ref}}</pre>
</template>

<script>
    import { db } from "@/lib/Firebase";

    export default {
        name: "ClientView",
        data() {
            return {
                ref: {},
            }
        },
        async mounted() {
            const user = db.collection('workers').doc(this.$store.state.firebaseAccount.userID);
            const ref = await user.collection('clients').doc(this.$route.params.id).get()
            if (ref.exists) {
                this.ref = ref.data()
                this.$toast.info(`Found Client ${ref.id}`)
            } else {
                this.$toast.error("Client not found!")
            }
        }
    }
</script>

<style scoped>

</style>