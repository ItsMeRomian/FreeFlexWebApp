<template class="container">
    <div>
        <div v-if="loaded === 5">
            <div v-if="variant === 'small'" class="card border-secondary mt-2">
                <div class="card-header">
                    <router-link :to="'/item/job/' + this.job['job_id']"><h4 class="float-left">{{this.job['job_id']}} | {{this.job['job_title']}} voor {{this.opdrachtgever['opdrachtgever_name']}}</h4></router-link>
                    <h4 class="float-right">
                        <span class="text-success mr-2">€ {{this.job['totalExclBTW'].toFixed(2)}}</span>
                        <span class="text-danger">€ {{this.job['totalBTWWithCosts'].toFixed(2)}}</span>
                    </h4>
                </div>
                <div class="card-body">
                    <p class="card-text">
                        Op {{this.job['job_date']}} van {{this.job['job_start'].slice(0, -3)}} tot {{this.job['job_end'].slice(0, -3)}} met {{this.job['job_break'].slice(0, -3)}} pauze ({{this.job['timeWorked'].toFixed(1)}})<br>
                        <a target="_blank" :href="'https://maps.google.com/?q=' + this.job['job_address']">{{this.job['job_address']}}</a><br>
                        Voor € {{this.job['job_rate']}} p/u</p>
                </div>
            </div>

            <div v-else-if="variant === 'medium'" class="card border-secondary mt-2">
                <div class="card-header">
                    <router-link :to="'/item/job/' + this.job['job_id']"><h3 class="float-left">{{this.job['job_id']}} | {{this.job['job_title']}} voor {{this.opdrachtgever['opdrachtgever_name']}}</h3></router-link>
                    <h3 class="float-right">€ {{this.job['totalExclBTW'].toFixed(2)}}</h3>
                </div>
                <div class="card-body">
                    <p class="card-text">
                        Op {{this.job['job_date']}} van {{this.job['job_start'].slice(0, -3)}} tot {{this.job['job_end'].slice(0, -3)}} met {{this.job['job_break'].slice(0, -3)}} pauze ({{this.job['timeWorked'].toFixed(1)}})<br>
                        <a target="_blank" :href="'https://maps.google.com/?q=' + this.job['job_address']">{{this.job['job_address']}}</a><br>
                        Voor € {{this.job['job_rate']}} p/u</p>
                </div>
            </div>

            <div v-else-if="variant === 'big'">
                <p class="float-right">Job Item! {{item}} | Size: {{variant}}</p>
                <h1>{{this.job['job_title']}} voor <router-link :to="'/item/opdrachtgever/' + this.opdrachtgever['opdrachtgever_id']">{{this.opdrachtgever['opdrachtgever_name']}}</router-link></h1>
                <p class="">
                    Door
                    <router-link :to="'/item/worker/' + this.worker['worker_id']">{{this.worker['worker_firstname'] + " " + this.worker['worker_lastname']}}</router-link>
                    <br>
                    Op {{this.job['job_date']}} van {{this.job['job_start'].slice(0, -3)}} tot {{this.job['job_end'].slice(0, -3)}} met {{this.job['job_break'].slice(0, -3)}} pauze ({{this.job['timeWorked'].toFixed(2)}})<br>
                    <a target="_blank" :href="'https://maps.google.com/?q=' + this.job['job_address']">{{this.job['job_address']}}</a><br>
                    Voor € {{this.job['job_rate']}} p/u <br>
                    Deze job is gelinkt aan <router-link :to="'/period/' + this.job['job_period']">periode {{this.job['job_period']}}</router-link>

                </p>
                <router-link :to="'/add/expense/'"></router-link>
                <br>
                <table class="table">
                    <thead>
                    <th>Factuur nummer</th>
                    <th>Job Naam</th>
                    <th>Job Opdrachtgever</th>
                    <th>Job start</th>
                    <th>Job eind</th>
                    <th>Job pauze</th>
                    <th>Job rate</th>
                    </thead>
                    <tbody>
                    <tr>
                        <td class="text-uppercase"><a :href="this.factuur['factuur_link']" target="_blank">{{this.factuur['factuur_number']}}</a></td>
                        <td>{{this.job['job_title']}}</td>
                        <td>{{this.opdrachtgever['opdrachtgever_name']}}</td>
                        <td>{{this.job['job_start']}}</td>
                        <td>{{this.job['job_end']}}</td>
                        <td>{{this.job['job_break']}}</td>
                        <td>€ {{parseFloat(this.job['job_rate']).toFixed(2)}}</td>
                    </tr>
                    </tbody>
                </table>

                <h2>Factuur details</h2>
                <table class="table">
                    <thead>
                    <th></th>
                    <th>Excl. BTW</th>
                    <th>BTW / Kosten</th>
                    <th>Incl. BTW</th>
                    </thead>
                    <tbody>
                    <tr>
                        <td>Job</td>
                        <td>€ {{parseFloat(this.job['100']).toFixed(2)}}</td>
                        <td>€ {{parseFloat(this.job['21']).toFixed(2)}}</td>
                        <td>€ {{parseFloat(this.job['121']).toFixed(2)}}</td>
                    </tr>
                    <tr>
                        <td>Factoring Kosten</td>
                        <td>€ -{{parseFloat(this.factuur['factoring100']).toFixed(2)}}</td>
                        <td>€ -{{parseFloat(this.factuur['factoring21']).toFixed(2)}}</td>
                        <td>€ -{{parseFloat(this.factuur['factoring121']).toFixed(2)}}</td>
                    </tr>

                    <tr>
                        <th>SubTotaal</th>
                        <th>€ {{((this.job['100']) - (this.factuur['factoring100'])).toFixed(2)}}</th>
                        <th>€ {{((this.job['21']) - (this.factuur['factoring21'])).toFixed(2)}}</th>
                        <th>€ {{((this.job['121']) - (this.factuur['factoring121']).toFixed(2)).toFixed(2)}}</th>
                    </tr>

                    <tr v-for="expense in this.expenses" :key="expense['expense_id']">
                        <td>{{expense['expense_name']}} #{{expense['expense_id']}}</td>

                        <td v-if="expense['expense_type'] === 'travelCosts'"></td>
                        <td v-if="expense['expense_type'] !== 'travelCosts'">€ -{{expense['expense_amount'] - expense['BTWofExpense']}} </td>

                        <td>€ -{{expense['BTWofExpense']}}</td>

                        <td v-if="expense['expense_type'] === 'travelCosts'"></td>
                        <td v-if="expense['expense_type'] !== 'travelCosts'">€ -{{parseFloat(expense['expense_amount']).toFixed(2)}} </td>
                    </tr>
                    <tr>
                        <th>Totalen</th>
                        <th>€ {{this.job['totalExclBTW'].toFixed(2)}}</th>
                        <th>€ {{this.job['totalBTWWithCosts'].toFixed(2)}}</th>
                        <th>€ {{this.job['totalIncBTW'].toFixed(2)}}</th>
                    </tr>
                    </tbody>
                </table>
            </div>
            <div v-else-if="variant === undefined">No size chosen</div>
        </div>
    <div v-else>
        LOADING! <br>
        {{loaded}}
        job{{whatLoaded['job']}}
        opdr{{whatLoaded['opdrachtgever']}}
        worker{{whatLoaded['worker']}}
        factuur{{whatLoaded['factuur']}}
        expense{{whatLoaded['expense']}}
    </div>
    </div>
</template>

<script>
    import axios from 'axios';
    export default {
        name: "Job",
        props: {
            item: String,
            variant: String,
        },
        data () {
            return {
                loaded: 0,
                whatLoaded: [],
                job: "",
                opdrachtgever: "",
                worker: "",
                factuur: "",
                expenses: ""
            }
        },
        async mounted () {
            console.time("🔥")
            await axios.post('http://192.168.1.200/YoungOnes/API/Jobs/Get', {
                    "id": this.$props.item
                })
                .then(async (response) => {
                    this.job = response.data.return[0]
                    this.loaded += 1;
                    this.whatLoaded['job'] = true;
                    //start opdrachtgever
                    return (
                        await axios
                            .post('http://192.168.1.200/YoungOnes/API/Opdrachtgevers/Get', {
                                "id": this.job.opdrachtgever_id
                            })
                            .then((response) => {
                                this.opdrachtgever = response.data.return[0]
                                this.loaded += 1;
                                this.whatLoaded['opdrachtgever'] = true;
                            }).catch(error => console.log(error)),
                        //end opdrachtgever
                        await axios
                            .post('http://192.168.1.200/YoungOnes/API/Workers/Get', {
                                "id": this.job.worker_id
                            })
                            .then((response) => {
                                this.worker = response.data.return[0]
                                this.loaded += 1;
                                this.whatLoaded['worker'] = true;
                            }).catch(error => console.log(error)),
                        await axios
                            .post('http://192.168.1.200/YoungOnes/API/Facturen/Get', {
                                "id": this.job.factuur_id
                            })
                             .then((response) => {
                                 this.factuur = response.data.return[0]
                                 this.loaded += 1;
                                 this.whatLoaded['factuur'] = true;

                             })
                            .catch(error => console.log(error)),
                        await axios
                            .post('http://192.168.1.200/YoungOnes/API/Expenses/getByJobId', {
                                "id": this.job.job_id
                            })
                            .then((response) => {
                                this.loaded += 1;
                                this.whatLoaded['expense'] = true;
                                this.expenses = response.data.return
                                this.calcSomething(this.job, this.opdrachtgever, this.worker, this.factuur, this.expenses)
                                console.timeEnd("🔥")

                            })
                            .catch(error => console.log(error))
                        )
                }).catch(error => console.log(error))
        },
        methods: {
            calcSomething: function (job, opdrachtgever, worker, factuur, expenses) {
                opdrachtgever
                worker

                //Make a Date object from the date
                this.job['dateObject'] = new Date(this.job['job_date']);

                //Check if job is done
                this.job['jobInPast'] = this.job['dateObject'] - Date.parse(new Date()) < 0;


                //Change all times to Floats!
                this.job['job_startFloat'] = this.timeToFloat(job['job_start'])
                this.job['job_endFloat'] = this.timeToFloat(job['job_end'])
                this.job['job_breakFloat'] = this.timeToFloat(job['job_break'])

                if (this.job['job_endFloat'] < this.job['job_startFloat']) {
                    this.job['job_endFloat'] += + 24
                }
                this.job['timeWorked'] = this.job['job_endFloat'] - this.job['job_breakFloat'] - this.job['job_startFloat'] //Calc float of time worked

                this.job['100'] = this.job['timeWorked'] * this.job['job_rate']                                         //Calc 100%
                this.job['21'] = this.job['100'] * 0.21                                                                 //Calc 21%
                this.job['121'] = this.job['100'] + this.job['21']                                                      //Calc 121%

                //Calc the factoring expenses
                if (factuur['factuur_factoring']) {
                    this.factuur['factoring100'] = this.job['121'] * this.factuur['factuur_facturingPercentage'] / 100 //Dit is wat je eindstand betaald over je factuur
                    this.factuur['factoring21'] = this.factuur['factoring100'] * 0.21                                  //Dit krijg je terug van de belastingdienst
                    this.factuur['factoring121'] = this.factuur['factoring100'] + this.factuur['factoring21']          //Dit betaal je nu maar je krijgt dus 21 terug
                } else { //Als er geen factoring is zetten we alles op 0
                    this.factuur['factoring100'] = 0
                    this.factuur['factoring21'] = 0
                    this.factuur['factoring121'] = 0
                }

                //Loop through the expenses made and sum them up
                let expense121 = 0, expense21 = 0, kilometersMade = 0, expense100 = 0
                for (let index = 0; index < expenses.length; ++index) {

                    //Bereken de btw van de expense
                    expenses[index]['BTWofExpense'] = parseFloat(parseFloat(expenses[index]["expense_amount"]) * ( parseFloat(expenses[index]["expense_btw"]) / 100 )).toFixed(2)
                    //Tel alle btw van de expense bij elkaar op
                    expense21 += parseFloat(expenses[index]['BTWofExpense'])

                    //Als de type reiskosten is maak dat dan de afgelegde hoeveelheid, anders tel het op bij de kosten
                    if (expenses[index]['expense_type'] === "travelCosts") {
                        kilometersMade = expenses[index]['expense_amount']
                    } else {
                        //Dit is niet echt 121, omdat er ook 19% tussenzit, maar voor de duidelijkheid is dit dus het bedrag inc btw
                        expense121 += parseFloat(expenses[index]["expense_amount"])                                     //Tel alle amounts van de expenses bij elkaar op
                        expense100 += parseFloat(expenses[index]["expense_amount"]) - expenses[index]['BTWofExpense']   //Tel alle amounts zonder btw bij elkaar op
                    }


                }

                this.job['expense121'] = expense121
                this.job['expense100'] = expense100
                this.job['expense21'] = expense21
                this.job['kilometersMade'] = kilometersMade

                //Totaal wat je terug krijgt ZONDER kosten
                this.job['totalBTW'] = parseFloat(this.job['21']) - parseFloat(this.factuur['factoring21'])

                //Uiteindelijke totalen:
                this.job['totalBTWWithCosts'] = this.job['totalBTW'] - parseFloat(this.job['expense21'])
                this.job['totalIncBTW'] = this.job['121'] - this.factuur['factoring121'] - this.job['expense121']
                this.job['totalExclBTW'] = this.job['100'] - this.factuur['factoring100'] - this.job['expense100']
            },
            makeJobPayed: async function() {
                await axios
                    .post('http://192.168.1.200/YoungOnes/API/Facturen/setPayed', {
                        "factuur_id": this.factuur['factuur_id'],
                        "factuur_number": this.inputValues.inputFactuurNumber,
                        "factuur_link": this.inputValues.inputFactuurLink
                    })
                    .then((response) => {
                        console.log(response.data)
                        this.getData()
                        this.showDefaultView()
                        console.log("Done! 🔥")
                    })
            },
            timeToFloat: function (time) {
                var hoursMinutes = time.split(/[.:]/);
                var hours = parseInt(hoursMinutes[0], 10);
                var minutes = hoursMinutes[1] ? parseInt(hoursMinutes[1], 10) : 0;
                return hours + minutes / 60;
            },

            loadPage: function(job, opdrachtgever, factuur, worker, expenses) {
                let loaded = 0
                if (job) {
                    loaded += 1;
                }if (opdrachtgever) {
                    loaded += 1;
                }if (factuur) {
                    loaded += 1;
                }if (worker) {
                    loaded += 1;
                }if (expenses) {
                    loaded += 1;
                }
                return loaded === 5;
            }
        }

    }
</script>

<style scoped>
</style>