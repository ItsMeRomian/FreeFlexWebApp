<template>
    <div class="jobView" v-if="job.calculator">
        <div class="row">
            <div class="col">
                <div class="row">
                    <div class="col">
                        <b>{{job.calculator.formatTime().format('DD MMM YYYY')}} · {{job.start}} - {{job.end}}</b>
                        <br>

                        <span class="badge bg-success" v-if="job.isPayed">Payed</span>
                        <span class="badge bg-danger" v-if="!job.isPayed">Not Payed</span>
                        <span class="mx-1"/>
                        <span class="badge bg-success" v-if="job.isCheckedOut">Checked Out</span>
                        <span class="badge bg-danger" v-if="!job.isCheckedOut">Not Checked Out</span>

                        <h3 class="display-6"><ClickToEdit :value="job.title" @changedData="newValues.title = $event"/></h3>
                        <h3>
                            For <router-link :to="'/view/client/'+job.client">{{job.clientName}}</router-link>
                        </h3>
                        <span class="star-holder h3">
                            <i class="bi bi-star-fill"></i>
                            <i class="bi bi-star-fill"></i>
                            <i class="bi bi-star-fill"></i>
                            <i class="bi bi-star-fill"></i>
                            <i class="bi bi-star-half"></i>
                        </span>
                        <div class="buttonList my-3">
                            <p>Available Actions:</p>
                            <hr>
                            <span class="btn btn-success" @click="setNewValues" v-if="Object.entries(newValues).length">Submit new Values</span>

                            <router-link class="btn btn-success mx-1" v-if="!job.isCheckedOut && job.calculator.isJobInPast()" :to="'/view/job/'+job.id+'/checkout'">Checkout</router-link>
                            <span class="btn btn-success mx-1" v-if="!job.isPayed && job.isCheckedOut && job.calculator.isJobInPast()" @click="setJobPayed">Set Job to Payed</span>
                            <span class="btn btn-danger mx-1" @click="deleteJob">Delete</span>

                            <hr>
                        </div>
                    </div>
                </div>
                <div class="row">
                    <div class="col">
                        <p class="lh-lg h5">
                            <i class="bi bi-calendar-check"></i> Client has <b><ClickToEdit :value="job.daysToPay" @changedData="newValues.daysToPay = $event"/></b> days to pay<br>
                            <i class="bi bi-cash"></i> For <b>€<ClickToEdit :value="job.rate" @changedData="newValues.rate = $event"/></b> p/u<br>
                            <i class="bi bi-check-circle-fill"></i>
                                You have been planned from
                                <b v-if="!job.oldStart"><ClickToEdit :value="job.start" @changedData="newValues.start = $event"/></b>
                                <b v-else>{{job.oldStart}}</b>
                                till
                                <b v-if="!job.oldEnd"><ClickToEdit :value="job.end" @changedData="newValues.end = $event"/></b>
                                <b v-else>{{job.oldEnd}}</b>
                                , and took a break of
                                <b v-if="!job.oldPauze"><ClickToEdit :value="job.pauze" @changedData="newValues.pauze = $event"/></b>
                                <b v-else>{{job.oldPauze}}</b>
                                <br>

                            <span v-if="job.isCheckedOut"><i class="bi bi-check-circle-fill"></i> You have checked out ({{job.start}} - {{job.end}}, with {{job.pauze}} break)<br></span>
                            <span v-else><i class="bi bi-check-circle"></i> You have not checked out<br></span>

                            <i class="bi bi-check-circle" v-if="!job.isPayed"></i>
                            <i class="bi bi-check-circle-fill" v-else></i>
                            You have till <b>{{job.calculator.formatTime().add(job.daysToPay, 'd').format('DD MMM YYYY')}}</b> to get payed<br>

                            <i class="bi bi-check-circle" v-if="!job.isPayed"></i>
                            <i class="bi bi-check-circle-fill" v-else></i>
                            <b> €{{job.calculator.getSubInclBTW().toFixed(2)}}</b> will appear on your bank account<br>
                        </p>
                    </div>
                </div>
            </div>
            <div class="col-5 text-end">
                <div class="row">
                    <div class="col">

                        <GoogleMapsUI
                                :zoom="10"
                                :address="job.address"
                                style="border:solid 5px; border-radius: 5px"
                        />

                        <h4><ClickToEdit :value="job.address" @changedData="newValues.address = $event"/></h4>
                    </div>
                </div>
                <div class="row">
                    <div class="col mt-5">
                        <table class="table text-light">
                            <thead class="thead-dark">
                            <tr>
                                <th scope="col">Factuur Details</th>
                                <th scope="col">Excl. BTW</th>
                                <th scope="col">BTW</th>
                                <th scope="col">Incl. BTW</th>
                            </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>{{job.title}}</td>
                                    <td>€{{job.calculator.getExclBTW().toFixed(2)}}</td>
                                    <td>€{{job.calculator.getBTW().toFixed(2)}}</td>
                                    <td>€{{job.calculator.getInclBTW().toFixed(2)}}</td>
                                </tr>
                                <tr v-if="job.factoringPercentage">
                                    <td>Factoring (<ClickToEdit :value="job.factoringPercentage" @changedData="newValues.factoringPercentage = $event"/>%)</td>
                                    <td>€-{{job.calculator.getFactoringExclBTW().toFixed(2)}}</td>
                                    <td>€-{{job.calculator.getFactoringBTW().toFixed(2)}}</td>
                                    <td>€-{{job.calculator.getFactoringInclBTW().toFixed(2)}}</td>
                                </tr>
                                <tr v-else><td><router-link to="al">Add Factoring</router-link></td></tr>
                                <tr>
                                    <td><b>Subtotaal</b></td>
                                    <td>€{{job.calculator.getSubExclBTW().toFixed(2)}}</td>
                                    <td>€{{job.calculator.getSubBTW().toFixed(2)}}</td>
                                    <td>€{{job.calculator.getSubInclBTW().toFixed(2)}}</td>
                                </tr>
                                <tr v-for="expense in expenses" :key="expense.id">
                                    <td>Expense <router-link :to="'/view/job/'+ job.id +'/expense/' + expense.id">{{expense.id.substring(0,5)}}</router-link>...</td>
                                    <td>€{{expense.calculator.getExclBTW()}}</td>
                                    <td>€{{expense.calculator.getBTW()}}</td>
                                    <td>€{{expense.calculator.getInclBTW()}}</td>
                                </tr>
                                <tr v-if="!expenses.length">
                                    <td><router-link :to="'/create/expense/' + $route.params.id">Add Expense</router-link></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                </tr>
                                <tr>
                                    <td><b>Total</b></td>
                                    <td>€ {{(job.calculator.getSubExclBTW() + expensesTotals.totalExcl).toFixed(2)}}</td>
                                    <td>€ {{(job.calculator.getSubBTW() + expensesTotals.totalBTW).toFixed(2)}}</td>
                                    <td>€ {{(job.calculator.getSubInclBTW() + expensesTotals.totalIncl).toFixed(2)}}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
        <div class="row">
                <span class="btn btn-info" @click="debugAccount = true" v-if="!debugAccount">debug </span>
                <span class="btn btn-outline-info" @click="debugAccount = false" v-if="debugAccount">debug </span>
                <div v-if="debugAccount">
                    <pre class="col">{{job}}</pre>
                    <pre class="col">{{newValues}}</pre>
                    <pre class="col">{{expensesTotals}}</pre>
                </div>
        </div>
    </div>
</template>

<script>
    import GoogleMapsUI from "../../components/GoogleMapsUI";
    import { db } from "@/lib/Firebase";
    import {CalculateJob} from "../../lib/CalculateJob";
    import ClickToEdit from "../../components/ClickToEdit";
    import Expense from "../../components/Expense";
    import {CalculateExpense} from "../../lib/CalculateExpense";

    export default {
        name: "JobView",
        components: {Expense, ClickToEdit, GoogleMapsUI},
        data() {
            return {
                debugAccount: false,
                job: {},
                newValues: {},
                expenses: [],
                expensesTotals: {
                    totalExcl: 0,
                    totalBTW: 0,
                    totalIncl: 0,
                    total: 0,
                    //...
                },
                user: db.collection('workers').doc(this.$store.state.firebaseAccount.userID),
                toDeleteExpense: ""
            }
        },
        async mounted() {
            await this.getJob();
            await this.getExpenses();
        },
        methods: {
            async getJob() {
                const jobRef = await this.user.collection('jobs').doc(this.$route.params.id).get()
                if (jobRef.exists) {
                    this.job = jobRef.data()
                    this.job.id = jobRef.id
                    this.job.calculator = new CalculateJob(jobRef.data())
                    this.$toast.info(`Found Job ${jobRef.id}`)
                } else {
                    this.$toast.error("Job not found!")
                }
            },
            async getExpenses() {
                const expensesRef = await this.user.collection('jobs').doc(this.$route.params.id).collection('expenses').get();
                expensesRef.forEach(doc => {
                    this.expenses.push({
                        id: doc.id,
                        data: doc.data(),
                        calculator: new CalculateExpense(doc.data())
                    });
                })
                this.getExpensesTotals()
            },
            getExpensesTotals() {
                this.expenses.forEach((expense) => {
                    this.expensesTotals.totalExcl += expense.calculator.getExclBTW()
                    this.expensesTotals.totalBTW += expense.calculator.getBTW()
                    this.expensesTotals.totalIncl += expense.calculator.getInclBTW()
                })
                this.expensesTotals.total = this.expenses.length
            },
            async setNewValues() {
                const newValuesRef = this.user.collection('jobs').doc(this.$route.params.id);
                await newValuesRef.set(this.newValues, {merge: true});
                await this.getJob()
                this.$toast.success("Done!")
            },
            async setJobPayed() {
                const newValuesRef = this.user.collection('jobs').doc(this.$route.params.id);
                await newValuesRef.set({'isPayed': true}, {merge: true});
                await this.getJob()
                this.$toast.success("Done!")
            },
            async deleteJob() {
                if (!this.expenses.length) {
                    this.user.collection("jobs").doc(this.job.id).delete().then(() => {
                        delete this.job
                        this.$toast.info("Document successfully deleted!");
                    }).catch((error) => {
                        this.$toast.error(`Error removing document: ${error}`);
                    });
                } else {
                    this.$toast.error("This job has expenses!");
                }
            },
        },
        watch: {
            toDeleteExpense: function() {
                this.user.collection("jobs").doc(this.job.id).collection("expenses").doc(this.toDeleteExpense).delete().then(() => {
                    this.$toast.info("Expense Deleted!!");
                    this.expenses = []
                    this.toDeleteExpense = undefined
                    this.getExpenses()
                }).catch((error) => {
                    this.$toast.error(`Error removing document: ${error}`);
                });
            }
        }
    }
</script>

<style scoped>

</style>