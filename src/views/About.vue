<template >
    <div class="about">
        <h1>This is an about page</h1>
    </div>
    this.$store.state.loggedInUser
    <pre>{{this.$store.state.loggedInUser }}</pre>
    this.$store.state.loggedIn
    <pre>{{this.$store.state.loggedIn}}</pre>
    this.$store.state.firebaseAccount
    <pre>{{this.$store.state.firebaseAccount}}</pre>
    <button v-on:click="increment">Increment</button>
</template>
<script>
    import {db} from "../lib/Firebase";

    export default {
        name: "About",
        data() {
            return {
                user: {},
            }
        },
        methods: {
            async increment() {
                this.user = await db.collection('workers').doc(this.$store.state.loggedInUser.xR).get().then((doc) => {
                    console.log(doc.data())
                })

                // const user = db.collection('workers').doc('111008305452264037657')
                // const ref = await user.collection('jobs').where('a', '==', 'b').get();
                // ref.forEach(doc => {
                //   console.log(doc.data())
                // })
            }
        }
    }
</script>