<template>
    Client CREATE
    <div class="row"><div class="col">
        <form class="form-horizontal">
            <fieldset>
                <legend>Form Name</legend>
                <div class="form-group">
                    <label class="col-md-4 control-label" for="name">name</label>
                    <div class="col-md-4">
                        <input id="name" name="name" type="text" placeholder="title" class="form-control input-md" v-model="input.name">
                        <span class="help-block">title</span>
                    </div>
                </div>
                <div class="form-group">
                    <label class="col-md-4 control-label" for="KVK">KVK</label>
                    <div class="col-md-4">
                        <input id="KVK" name="KVK" type="text" placeholder="rate" class="form-control input-md" v-model="input.KVK">
                    </div>
                </div>
                <div class="form-group">
                    <label class="col-md-4 control-label" for="BTW">BTW</label>
                    <div class="col-md-4">
                        <input id="BTW" name="BTW" type="text" placeholder="placeholder" class="form-control input-md" v-model="input.BTW">
                    </div>
                </div>
                <div class="form-group">
                    <label class="col-md-4 control-label" for="email">email</label>
                    <div class="col-md-4">
                        <input id="email" name="email" type="text" placeholder="placeholder" class="form-control input-md" v-model="input.email">
                    </div>
                </div>
                <div class="form-group">
                    <label class="col-md-4 control-label" for="phone">phone</label>
                    <div class="col-md-4">
                        <input id="phone" name="phone" type="text" placeholder="placeholder" class="form-control input-md" v-model="input.phone">
                    </div>
                </div>
                <div class="form-group">
                    <label class="col-md-4 control-label" for="address">address</label>
                    <div class="col-md-4">
                        <input id="address" name="address" type="text" placeholder="placeholder" class="form-control input-md" v-model="input.address">
                    </div>
                </div>
                <div class="form-group">
                    <label class="col-md-4 control-label" for="worker">worker</label>
                    <div class="col-md-4">
                        <input disabled id="worker" name="worker" type="text" placeholder="placeholder" class="form-control input-md" v-model="input.worker">
                    </div>
                </div>
                <div class="form-group">
                    <label class="col-md-4 control-label" for="contactPerson">contactPerson</label>
                    <div class="col-md-4">
                        <input id="contactPerson" name="contactPerson" type="text" placeholder="placeholder" class="form-control input-md" v-model="input.contactPerson">
                    </div>
                </div>
                <span @click="createClient" class="btn btn-success">Create Client</span>
            </fieldset>
        </form>
    </div>
        <pre class="col">
            {{input}}
        </pre>
    </div>

</template>

<script>
    import { db } from "@/lib/Firebase";

    export default {
        name: "ClientCreate",
        data() {
            return {
                input: {
                    name: "String",
                    KVK: "String",
                    BTW: "String",
                    email: "String",
                    phone: "String",
                    address: "String",
                    contactPerson: "String",
                    worker: this.$store.state.firebaseAccount.userID
                },
            }
        },
        methods: {
            async createClient() {
                const userRef = db.collection('workers').doc(this.$store.state.firebaseAccount.userID);
                const res = await userRef.collection('clients').add(this.input)
                if (res.id) {
                    console.log("created client with " + res.id)
                    this.$toast.success("Created Client with ID: " + res.id)
                    this.$store.dispatch('refreshData')
                    this.$toast.info(`Refreshing data...`)
                } else {
                    console.error("Could not create Client!")
                    this.$toast.error("Could not create Client!")
                }
            }
        }
    }
</script>

<style scoped>

</style>