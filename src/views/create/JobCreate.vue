<template>
    Job CREATE
    <div class="row">
        <div class="col">
            <form class="form-horizontal">
                <fieldset>
                    <div class="row">
                        <div class="col">
                            <legend>Form Name</legend>
                            <div class="form-group">
                                <label class="col control-label" for="title">title</label>
                                <div class="col">
                                    <input id="title" name="title" type="text" placeholder="title" class="form-control input-md" v-model="input.title">
                                    <span class="help-block">title</span>
                                </div>
                            </div>
                            <div class="form-group">
                                <label class="col control-label" for="rate">rate</label>
                                <div class="col">
                                    <input id="rate" name="rate"  placeholder="rate" type="number" class="form-control input-md" v-model.number="input.rate">
                                </div>
                            </div>
                            <div class="form-group">
                                <div class="form-group row">
                                    <div class="col">
                                        <label class="col control-label">date</label>
                                        <datepicker v-model="input.date" :locale="locale"/>
                                    </div>
                                    <div class="col">
                                        <label class="col control-label">period</label>
                                        <input v-model="input.period" disabled class="form-control input-md">
                                    </div>
                                </div>
                            </div>
                            <div class="form-group">
                                <label class="col control-label" for="start">start</label>
                                <div class="col">
                                    <input id="start" name="start" type="text" placeholder="placeholder" class="form-control input-md" v-model="input.start">
                                </div>
                            </div>
                            <div class="form-group">
                                <label class="col control-label" for="pauze">break</label>
                                <div class="col">
                                    <input id="pauze" name="pauze" type="text" placeholder="placeholder" class="form-control input-md" v-model="input.pauze">
                                </div>
                            </div>
                            <div class="form-group">
                                <label class="col control-label" for="end">end</label>
                                <div class="col">
                                    <input id="end" name="end" type="text" placeholder="placeholder" class="form-control input-md" v-model="input.end">
                                </div>
                            </div>
                            <div class="form-group">
                                <label class="col control-label" for="client">client</label><span class="bg-danger" v-if="!input.client">Bro? ben je dom? invullen daggoe</span>
                                <div class="col">
                                    <select v-model="input.client" @click="getClients" name="client" id="client">
                                        <option v-for="client in clients" :key='client.id' :value="client.id">{{client.name}}</option>
                                        <option value="makeClient" @click="this.$router.push('/create/client')">Maak client...</option>  <!-- TODO: maak dit werkend -->
                                    </select>
                                </div>
                            </div>
                            <div class="form-group">
                                <label class="col control-label" for="worker">worker</label>
                                <div class="col">
                                    <input disabled id="worker" name="worker" type="text" placeholder="placeholder" class="form-control input-md" v-model="input.worker">
                                </div>
                            </div>
                            <span @click="createJob" class="btn btn-success">Create Job</span>
                        </div>
                        <div class="col">
                            <div class="form-group ">
                                <label for="travel" class="col-4 col-form-label">Travel?</label>
                                <div class="col-8">
                                    <select id="travel" name="travel" class="custom-select" required="required" v-model="input.travel">
                                        <option value="true">True</option>
                                        <option value="false">False</option>
                                    </select>
                                </div>
                            </div>
                            <div class="form-group ">
                                <label class="col-4 col-form-label" for="distance">Distance</label>
                                <div class="col-8">
                                    <input id="distance" name="distance" placeholder="67" type="number" class="form-control" required="required" v-model.number="input.distance">
                                </div>
                            </div>
                            <div class="form-group ">
                                <label for="wayOfTravel" class="col-4 col-form-label">WayOfTravel</label>
                                <div class="col-8">
                                    <select id="wayOfTravel" name="wayOfTravel" required="required" class="custom-select" v-model="input.wayOfTravel">
                                        <option value="car">Car</option>
                                        <option value="bike">Bike</option>
                                        <option value="walk">Walking</option>
                                        <option value="swim">Swimming</option>
                                    </select>
                                </div>
                            </div>
                            <div class="form-group ">
                                <label for="double" class="col-4 col-form-label">Double?</label>
                                <div class="col-8">
                                    <select id="double" name="double" class="custom-select" v-model="input.double">
                                        <option value="true">double</option>
                                        <option value="false">dont double</option>
                                    </select>
                                </div>
                            </div>
                            <div class="form-group ">
                                <label for="factoring" class="col-4 col-form-label">factoring?</label>
                                <div class="col-8">
                                    <select id="factoring" name="factoring" class="custom-select" required="required" v-model="input.factoring">
                                        <option value="true">True</option>
                                        <option value="false">False</option>
                                    </select>
                                </div>
                            </div>
                            <div class="form-group ">
                                <label class="col-4 col-form-label" for="factoringPercentage">factoringPercentage</label>
                                <div class="col-8">
                                    <input id="factoringPercentage" name="factoringPercentage" placeholder="2.9" type="number" class="form-control" required="required" v-model.number="input.factoringPercentage">
                                </div>
                            </div>
                            <div class="form-group ">
                                <label class="col-4 col-form-label" for="daysToPay">daysToPay?</label>
                                <div class="col-8">
                                    <input id="daysToPay" disabled name="daysToPay" placeholder="4" type="number" class="form-control" required="required" v-model.number="input.daysToPay">
                                </div>
                            </div>
                        </div>
                    </div>
                </fieldset>
            </form>
        </div>
        <div class="col">
            <pre>{{input}}</pre>
            <div class="btn btn-danger" @click="getClientName()">GETCLIENTNAME</div>
        </div>
    </div>

</template>

<script>
    import { nl } from "date-fns/locale";
    import { db } from "@/lib/Firebase";
    import Datepicker from 'vue3-datepicker'
    import {PeriodCalculator} from "../../lib/PeriodCalculator";
    import moment from 'moment'

    export default {
        name: "JobCreate",
        components: {
            Datepicker
        },
        data() {
            return {
                locale: nl,
                input: {
                    title: "string",
                    rate: 13,
                    date: new Date(),
                    start: "18:00",
                    end: "23:00",
                    pauze: "00:30",
                    client: "",
                    clientName: "",
                    worker: this.$store.state.firebaseAccount.userID,
                    address: "string",
                    travel: true,
                    distance: 51,
                    wayOfTravel: 'bike',
                    double: true,
                    period: "", //TODO: Auto calc dit
                    factoring: true,
                    factoringPercentage: "2.9",
                    daysToPay: 4,
                },
                clients: []
            }
        },
        methods: {
            async createJob() {
                this.getClientName()
                const userRef = db.collection('workers').doc(this.$store.state.firebaseAccount.userID);
                //TODO: For some reason, the datepicker removes 2 hours, setting the date back one day. This code adds a day to fix it.
                this.input.date = moment(
                    this.input.date
                        .toISOString()
                        .substr(0,10)
                ).add(1, 'days')
                 .format('YYYY-MM-DD')
                const res = await userRef.collection('jobs').add(this.input)
                if (res.id) {
                    console.log("created Job with " + res.id)
                    this.$toast.success(`Created Job with ID: ${res.id}`)
                    this.$store.dispatch('refreshData')
                    this.$toast.info(`Refreshing data...`)
                } else {
                    console.error("Could not create Job!")
                    this.$toast.error("Could not create Job!")
                }
            },
            async getClients() {
                if (this.clients.length === 0) {
                    const userRef = db.collection('workers').doc(this.$store.state.firebaseAccount.userID);
                    const ref = await userRef.collection('clients').get()
                    ref.forEach(doc => {
                        this.clients.push({
                            id: doc.id,
                            name: doc.data().name
                        })
                    })
                    if (this.clients.length) {
                        this.$toast.success(`Gotten list of clients (${this.clients.length})`)
                    } else {
                        this.$toast.error("Failed to get list of clients. Maybe none?")
                    }
                }
            },
            getClientName() {
                this.clients.forEach((client) => {
                    console.log(client.id)
                    if (client.id === this.input.client) {
                        this.input.clientName = client.name;
                    }
                })
            }
        },
        watch: {
            inputDate: function() {
                this.input.period = new PeriodCalculator(this.input.date).today()
            }
        },
        computed: {
            inputDate() {
                return this.input.date;
            }
        },
    }
</script>

<style scoped>

</style>