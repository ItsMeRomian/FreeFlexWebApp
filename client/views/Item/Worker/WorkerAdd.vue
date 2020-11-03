<template>
    <div>
        <h1>Add a worker</h1>
        <form>
            <div class="form-row">
                <div class="form-group col-md-6">
                    <label for="WorkerFirstName">Whats the first name of the worker?</label>
                    <input type="text" class="form-control" id="WorkerFirstName" placeholder="Romian" v-model="readyToSend.worker_firstname">
                </div>
                <div class="form-group col-md-6">
                    <label for="WorkerLastName">Whats the last name of the worker?</label>
                    <input v-model="readyToSend.worker_lastname" id="WorkerLastName" placeholder="Tairovski" class="form-control">
                </div>
            </div>
            <div class="form-row">
                <div class="form-group col-md-6">
                    <label for="opdrachtgeverKVK">What's the BTW number?</label>
                    <input v-model="readyToSend.worker_btwnumber" id="opdrachtgeverKVK" placeholder="NL002432211B67" class="form-control">
                </div>
                <div class="form-group col-md-6">
                    <label for="workerKVK">What's the KVK number?</label>
                    <input type="text" class="form-control" id="workerKVK" placeholder="You dont have to fill this."  v-model="readyToSend.worker_kvknumber">
                </div>
            </div>
            <div class="form-row">
                <div class="form-group col-md-6">
                    <label for="workerBank">What's the bank number?</label>
                    <input v-model="readyToSend.worker_banknumber" id="workerBank" placeholder="NL57 INGB 0659 1614 27" class="form-control">
                </div>
                <div class="form-group col-md-6">
                    <label for="jobRate"></label>
                    <input type="text" class="form-control" id="jobRate" placeholder="" disabled v-model="readyToSend.worker_kvknumber">
                </div>
            </div>
            <div class="form-row">
                <div class="form-group col-md-6">
                    <label for="workerAddress">Whats the address?</label>
                    <input v-model="readyToSend.worker_address" id="workerAddress" placeholder="Stationsstraat 15" class="form-control">
                </div>
                <div class="form-group col-md-3">
                    <label for="workerCity">Whats the city of the worker?</label>
                    <input type="text" class="form-control" id="workerCity" placeholder="Amsterdam" v-model="readyToSend.worker_city">
                </div>
                <div class="form-group col-md-3">
                    <label for="workerCountry">What country is the worker from?</label>
                    <input type="text" class="form-control" id="workerCountry" placeholder="Netherlands"  v-model="readyToSend.worker_country">
                </div>
            </div>
            <span type="submit" class="btn btn-primary" @click="submitData()">Add Worker!</span>
        </form>
    </div>
</template>

<script>
    import axios from "axios";

    export default {
        name: "WorkerAdd",
        data () {
            return {
                readyToSend: {}
            }
        },
        methods: {
            submitData: async function () {
                console.log("submitdata ran")
                if (this.readyToSend.factuur_number !== null) {
                    console.log("factuur_number != null")
                    await axios
                        .post('http://192.168.1.200/YoungOnes/API/Workers/Create', {
                            "worker_firstname": this.readyToSend.worker_firstname,
                            "worker_lastname": this.readyToSend.worker_lastname,
                            "worker_btwnumber": this.readyToSend.worker_btwnumber,
                            "worker_kvknumber": this.readyToSend.worker_kvknumber,
                            "worker_address": this.readyToSend.worker_address,
                            "worker_city": this.readyToSend.worker_city,
                            "worker_country": this.readyToSend.worker_country
                        })
                        .then((response) => {
                            //let responseData = response.data
                            //console.log(responseData)
                            this.$router.push({ name: 'ItemView', params: { type: 'worker', id: response.data.id }, query: { created: 'success' } })
                        })
                }
            }
        }
    }
</script>

<style scoped>

</style>