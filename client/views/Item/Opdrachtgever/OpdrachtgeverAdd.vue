<template>
    <div>
        <h1>Add a opdrachtgever</h1>
        <form>
            <div class="form-row">
                <div class="form-group col-md-6">
                    <label for="opdrachtgeverName">Whats the name of the opdrachtgever?</label>
                    <input type="text" class="form-control" id="opdrachtgeverName" placeholder="Opvallers BV." v-model="readyToSend.opdrachtgever_name">
                </div>
                <div class="form-group col-md-6">
                    <label for="opdrachtgeverContact">For who did you work?</label>
                    <input v-model="readyToSend.opdrachtgever_contact" id="opdrachtgeverContact" placeholder="info@opvallers.nl" class="form-control">
                </div>
            </div>
            <div class="form-row">
                <div class="form-group col-md-6">
                    <label for="opdrachtgeverKVK">Do you have a KVK?</label>
                    <input v-model="readyToSend.opdrachtgever_KVK" id="opdrachtgeverKVK" disabled class="form-control">
                </div>
                <div class="form-group col-md-6">
                    <label for="jobRate">Do you have a BTWID?</label>
                    <input type="text" class="form-control" id="jobRate" placeholder="" disabled v-model="readyToSend.job_rate">
                </div>
            </div>
            <span type="submit" class="btn btn-primary" @click="submitData()">Add Opdrachtgever!</span>
        </form>
    </div>
</template>

<script>
    import axios from "axios";

    export default {
        name: "OpdrachtgeverAdd",
        data() {
            return {
                readyToSend: {},
            }
        },
        methods: {
            submitData: async function () {
                console.log("submitdata ran")
                if (this.readyToSend.factuur_number !== null) {
                    console.log("factuur_number != null")
                    await axios
                        .post('http://192.168.1.200/YoungOnes/API/Opdrachtgevers/Create', {
                            "opdrachtgever_name": this.readyToSend.opdrachtgever_name,
                            "opdrachtgever_contact": this.readyToSend.opdrachtgever_contact,
                            //"opdrachtgever_BTWID": this.readyToSend.opdrachtgever_BTWID,
                            //"opdrachtgever_KVK": this.readyToSend.opdrachtgever_KVK,
                        })
                        .then((response) => {
                            //let responseData = response.data
                            //console.log(responseData)
                            this.$router.push({ name: 'ItemView', params: { type: 'opdrachtgever', id: response.data.id }, query: { created: 'success' } })
                        })
                }
            }
        }
    }
</script>

<style scoped>

</style>