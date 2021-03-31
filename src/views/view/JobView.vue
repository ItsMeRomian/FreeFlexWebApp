<template>
    <div class="jobView" v-if="job.calculator">
        <div class="row">
            <div class="col">
                <div class="row">
                    <div class="col">
                        <span>{{job.calculator.formatTime().format('d MMM YYYY')}} · {{job.start}} - {{job.end}}</span>
                        <h2><ClickToEdit :value="job.title" @changedData="newValues.title = $event"/></h2>
                        <h3>
                            <router-link :to="'/view/client/'+job.client">{{job.clientName}}</router-link>
                        </h3>
                        <span class="star-holder">
                            <i class="bi bi-star-fill"></i>
                            <i class="bi bi-star-fill"></i>
                            <i class="bi bi-star-fill"></i>
                            <i class="bi bi-star-fill"></i>
                            <i class="bi bi-star-half"></i>
                        </span>
                        <div class="buttonList">
                            <span class="btn btn-success" @click="setNewValues">Submit new Values</span>
                            <span class="btn btn-success mx-1">ACTION</span>
                            <span class="btn btn-danger">ACTION</span>
                        </div>
                    </div>
                </div>
                <div class="row">
                    <div class="col">
                        <p>
                            <i class="bi bi-calendar-check"></i> Client has 4 days to pay<br>
                            <i class="bi bi-cash"></i>Voor € <ClickToEdit :value="job.rate" @changedData="newValues.rate = $event"/> p/u<br>
                            <i class="bi bi-check-circle-fill"></i> You worked from
                                <ClickToEdit :value="job.start" @changedData="newValues.start = $event"/>
                                till
                                <ClickToEdit :value="job.end" @changedData="newValues.end = $event"/>
                                , and took a break of
                                <ClickToEdit :value="job.pauze" @changedData="newValues.pauze = $event"/>
                                <br>
                            <i class="bi bi-check-circle-fill"></i> Your checkout has been accepted (19-12-2001)<br>
                            <i class="bi bi-check-circle"></i> You have till 22-01-2021 to get payed<br>
                            <i class="bi bi-check-circle"></i>{{job.calculator.getSubInclBTW().toFixed(2)}} will appear on your bank account<br>
                        </p>
                    </div>
                </div>
            </div>
            <div class="col text-end">
                <div class="row">
                    <div class="col">
                        <img src="../../assets/map-placeholder.png" class="">
                        <h3>{{job.address}}</h3>
                    </div>
                </div>
                <div class="row">
                    <div class="col">
                        <table class="table">
                            <thead>
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
                                    <td>€ {{job.calculator.getExclBTW().toFixed(2)}}</td>
                                    <td>€ {{job.calculator.getBTW().toFixed(2)}}</td>
                                    <td>€ {{job.calculator.getInclBTW().toFixed(2)}}</td>
                                </tr>
                                <tr>
                                    <td>Factoring</td>
                                    <td>€ -{{job.calculator.getFactoringExclBTW().toFixed(2)}}</td>
                                    <td>€ -{{job.calculator.getFactoringBTW().toFixed(2)}}</td>
                                    <td>€ -{{job.calculator.getFactoringInclBTW().toFixed(2)}}</td>
                                </tr>
                                <tr>
                                    <td><b>Subtotaal</b></td>
                                    <td>€ {{job.calculator.getSubExclBTW().toFixed(2)}}</td>
                                    <td>€ {{job.calculator.getSubBTW().toFixed(2)}}</td>
                                    <td>€ {{job.calculator.getSubInclBTW().toFixed(2)}}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
        <div class="row">
            <div class="col">

            </div>
        </div>
    </div>


<!--        Job VIEwW {{$route.params.id}}-->
<!--        <div class="row">-->
<!--            <div class="col">-->
<!--                <h1>JOB</h1>-->
<!--                <pre>{{job}}</pre>-->
<!--            </div>-->
<!--            <div class="col">-->
<!--                <b>Job period: (click to edit)</b>-->
<!--                <ClickToEdit :value="job.period" @changedData="newValues.period = $event"/>-->

<!--                <b>Job Title: (click to edit)</b>-->
<!--                <ClickToEdit :value="job.title" @changedData="newValues.title = $event"/>-->

<!--                <b>Job rate: (click to edit)</b>-->
<!--                <ClickToEdit :value="job.rate" @changedData="newValues.rate = $event"/>-->

<!--                <b>wayOfTravel: (click to edit)</b>-->
<!--                <ClickToEdit :value="job.wayOfTravel" @changedData="newValues.wayOfTravel = $event"/>-->

<!--                <b>address: (click to edit)</b>-->
<!--                <ClickToEdit :value="job.address" @changedData="newValues.address = $event"/>-->

<!--                <b>start: (click to edit)</b>-->
<!--                <ClickToEdit :value="job.start" @changedData="newValues.start = $event"/>-->

<!--                <pre>{{newValues}}</pre>-->
<!--                <span class="btn" @click="setNewValues">Submit new values</span>-->
<!--            </div>-->
<!--            <div class="col">-->
<!--                <h1>Expenses (if any)</h1>-->
<!--                <p>click to go</p>-->
<!--                <div v-for="expense in expenses" :key="expense.id" style="border:solid">-->
<!--                    <Expense :expense="expense" @deleteExpense="toDeleteExpense = $event"/>-->
<!--                </div>-->
<!--                <span class="btn"><router-link :to="'/create/expense/' + $route.params.id">MAAK EXPENSE GELINKT AAN DEZE JOB</router-link></span><br>-->
<!--                <router-link :to="'/view/client/' + job.client">CLIENT {{job.client}}</router-link><br>-->
<!--                <span class="btn btn-danger" @click="deleteJob()">DELETE </span>-->
<!--            </div>-->
<!--            <div class="col">-->
<!--                Expenses Summary<br>-->
<!--                <span class="btn btn-info" @click="getExpensesTotals">Calcumatation of the expense pls</span>-->
<!--                <pre>{{expensesTotals}}</pre>-->
<!--            </div>-->
<!--        </div>-->
</template>

<script>
    import { db } from "@/lib/Firebase";
    import {CalculateJob} from "../../lib/CalculateJob";
    import ClickToEdit from "../../components/ClickToEdit";
    import Expense from "../../components/Expense";

    export default {
        name: "JobView",
        components: {Expense, ClickToEdit},
        data() {
            return {
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
                        data: doc.data()
                    });
                })
            },
            getExpensesTotals() {
                this.expenses.forEach((expense) => {
                    const BTW = expense.data.amount * (expense.data.btwReduct/100) // 14,50 * (21/100)
                    this.expensesTotals.totalBTW += BTW
                    this.expensesTotals.totalIncl += expense.data.amount
                    this.expensesTotals.totalExcl += expense.data.amount - BTW
                })
                this.expensesTotals.total = this.expenses.length
            },
            async setNewValues() {
                const newValuesRef = this.user.collection('jobs').doc(this.$route.params.id);
                await newValuesRef.set(this.newValues, {merge: true});
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