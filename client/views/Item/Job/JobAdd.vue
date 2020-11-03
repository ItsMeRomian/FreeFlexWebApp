<template>
    <div>
        <h1>Add a job</h1>
        <form>
            <div class="form-row">
                <div class="form-group col-md-6">
                    <label for="jobName">How will you name the job?</label>
                    <input type="text" class="form-control" id="jobName" placeholder="Schoonmaakwerk" v-model="readyToSend.job_title">
                </div>
                <div class="form-group col-md-6">
                    <label for="jobOpdrachtgever">For who did you work?</label>
                    <select v-model="readyToSend.opdrachtgever_id" id="jobOpdrachtgever" class="form-control">
                        <option value="" selected="selected">Select someone...</option>
                        <option v-for="opdrachtgever in opdrachtgevers" v-bind:key="opdrachtgever.opdrachtgever_id" v-bind:value="opdrachtgever.opdrachtgever_id">
                            {{ opdrachtgever.opdrachtgever_name }}
                        </option>
                    </select>
                </div>
            </div>
            <div class="form-row">
                <div class="form-group col-md-10">
                    <label for="workerName">Who worked?</label>
                    <select v-model="readyToSend.worker_id" id="workerName" class="form-control">
                        <option value="" selected="selected">Select someone...</option>
                        <option v-for="worker in workers" v-bind:key="worker.worker_id" v-bind:value="worker.worker_id">
                            [{{worker.worker_id}}] {{ worker.worker_firstname + " " + worker.worker_lastname }}
                        </option>
                    </select>
                </div>
                <div class="form-group col-md-2">
                    <label for="jobRate">What will be the rate?</label>
                    <input type="text" class="form-control" id="jobRate" placeholder="16.5" v-model="readyToSend.job_rate">
                </div>
            </div>
            <div class="form-group">
                <label for="jobAddress">Where will you work?</label>
                <input type="text" class="form-control" id="jobAddress" placeholder="Alspingenstraat 15, Zwolle" v-model="readyToSend.job_address">
            </div>
            <div class="form-row">
                <div class="form-group col-md-6">
                    <label for="jobDate">What date did you work?</label>
                    <input type="text" class="form-control" id="jobDate" placeholder="2020-12-25" v-model="readyToSend.job_date">
                </div>
                <div class="form-group col-md-2">
                    <label for="jobStart">From</label>
                    <input type="text" class="form-control" id="jobStart" placeholder="12:00" v-model="readyToSend.job_start">
                </div>
                <div class="form-group col-md-2">
                    <label for="jobEnd">Till</label>
                    <input type="text" class="form-control" id="jobEnd" placeholder="16:00" v-model="readyToSend.job_end">
                </div>
                <div class="form-group col-md-2">
                    <label for="jobBreak">Break</label>
                    <input type="text" class="form-control" id="jobBreak" placeholder="00:30" v-model="readyToSend.job_break">
                </div>
            </div>
            <div class="form-group">
                <div class="form-check">
                    <input class="form-check-input" type="checkbox" id="gridCheck" v-model="hasFactuur">
                    <label class="form-check-label" for="gridCheck">
                        Do you already have a factuurnumber?
                    </label>
                </div>
            </div>
            <div class="form-row" v-if="hasFactuur">
                <div class="form-group col-md-3">
                    <label for="factuurNumber">What is the factuurnumber?</label>
                    <input type="text" class="form-control" id="factuurNumber" placeholder="G-1230591 / YON-ABC2340" v-model="readyToSend.factuur_number">
                </div>
                <div class="form-group col-md-2">
                    <label for="factuurPlatform">Platform?</label>
                    <select v-model="readyToSend.factuur_platform" id="factuurPlatform" class="form-control">
                        <option value="YoungOnes" selected="selected">YoungOnes</option>
                        <option value="Temper" selected="selected">Temper</option>
                        <option value="Freelance">Freelance (none)</option>
                    </select>
                </div>
                <div class="form-group col-md-2">
                    <label for="factuurLink">Do you have a link?</label>
                    <input type="text" class="form-control" id="factuurLink" placeholder="Temper.works/facturen/" v-model="readyToSend.factuur_link">
                </div>
                <div class="form-group col-md-2">
                    <label for="factuurTime">Payment term?</label>
                    <input type="text" class="form-control" id="factuurTime" placeholder="3" v-model="readyToSend.factuur_time">
                </div>
                <div class="form-group col-md-2">
                    <label for="factuurFactoringEnum">Factoring?</label>
                    <select v-model="readyToSend.factuur_factoring" id="factuurFactoringEnum" class="form-control">
                        <option value="1" selected="selected">Yes</option>
                        <option value="0">No</option>
                    </select>
                </div>
                <div class="form-group input-group col-md-1">
                    <label for="factuurFactoringPercentage">Percentage?</label>
                    <input type="text" class="form-control" aria-describedby="factuurFactoringPercentage" placeholder="2.9" v-model="readyToSend.factuur_facturingPercentage">
                    <div class="input-group-append">
                        <span class="input-group-text" id="factuurFactoringPercentage">%</span>
                    </div>
                </div>
            </div>
            <span type="submit" class="btn btn-primary" @click="submitData()">Add Job!</span>
        </form>
    </div>
</template>

<script>
    import axios from "axios";

    export default {
        name: "JobAdd",
        data () {
            return {
                submit: null,
                hasFactuur: 0,
                loaded: 0,
                job: {},
                opdrachtgevers: {},
                workers: {},
                whatLoaded: [],
                readyToSend: {
                    job_title: null,
                    worker_id: 1, // TODO: Fix
                    opdrachtgever_id: null,
                    factuur_id: null,
                    job_start: null,
                    job_end: null,
                    job_break: null,
                    job_date: null,
                    job_rate: null,
                    job_address: null,
                    job_period: 5, // TODO: Calculate the current period and add this value

                    factuur_link: null,
                    factuur_platform: null,
                    factuur_number: null,
                    factuur_factoring: null,
                    factuur_facturingPercentage: null,
                    factuur_time: null
                }
            }
        },
        mounted() {
            this.getData();
        },
        methods: {
            getData: async function () {
                this.loaded = 0
                await axios
                    .post('http://192.168.1.200/YoungOnes/API/Workers/Get')
                    .then((response) => {
                        this.workers = response.data.return
                        this.loaded += 1;
                        this.whatLoaded['opdrachtgever'] = true;
                    }).catch(error => console.log(error))

                await axios
                    .post('http://192.168.1.200/YoungOnes/API/Opdrachtgevers/Get')
                    .then((response) => {
                        this.opdrachtgevers = response.data.return
                        this.loaded += 1;
                        this.whatLoaded['opdrachtgever'] = true;
                    }).catch(error => console.log(error))
            },
            submitData: async function() {
                console.log("submitdata ran")
                if (this.readyToSend.factuur_number !== null) {
                    console.log("factuur_number != null")
                    await axios
                        .post('http://192.168.1.200/YoungOnes/API/Facturen/Create', {
                            "factuur_platform": this.readyToSend.factuur_platform,
                            "factuur_number": this.readyToSend.factuur_number,
                            "factuur_link": this.readyToSend.factuur_link,
                            "factuur_time": this.readyToSend.factuur_time,
                            "factuur_payed": 0, // TODO: Maybe make this a choice?
                            "factuur_factoring": this.readyToSend.factuur_factoring,
                            "factuur_facturingPercentage": this.readyToSend.factuur_facturingPercentage
                        })
                        .then(async (response) => {
                            let factuurResponse = response.data
                            console.log(factuurResponse)
                            return (
                                await axios
                                    .post('http://192.168.1.200/YoungOnes/API/Jobs/Create', {
                                        "job_title": this.readyToSend.job_title,
                                        "worker_id": this.readyToSend.worker_id,
                                        "opdrachtgever_id": this.readyToSend.opdrachtgever_id,
                                        "factuur_id": factuurResponse.id,
                                        "job_start": this.readyToSend.job_start,
                                        "job_end": this.readyToSend.job_end,
                                        "job_break": this.readyToSend.job_break,
                                        "job_date": this.readyToSend.job_date,
                                        "job_rate": this.readyToSend.job_rate,
                                        "job_address": this.readyToSend.job_address,
                                        "job_period": this.readyToSend.job_period
                                    })
                                .then((response) => {
                                    console.log(response)
                                    console.log("success???/")
                                    this.$router.push({ name: 'ItemView', params: { type: 'job', id: response.data.id }, query: { created: 'success' } })
                                })
                                .catch(error => console.log(error))
                            )

                        }).catch(error => console.log(error))
                }
            }
        }
    }
</script>

<style scoped>

</style>