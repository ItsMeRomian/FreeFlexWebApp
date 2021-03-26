<template>
    <div class="container-fluid">
        <div class="row">
            <div class="col">
                <h1>EXPENSE LINKED</h1>
                <pre>{{expense}}</pre>
            </div>
            <div class="col">
                <b>Expense Name: (click to edit)</b>
                <ClickToEdit :value="expense.name" @changedData="newValues.name = $event"/>

                <b>Expense amount: (click to edit)</b>
                <ClickToEdit :value="expense.amount" @changedData="newValues.amount = $event"/>

                <b>btwReduct: (click to edit)</b>
                <ClickToEdit :value="expense.btwReduct" @changedData="newValues.btwReduct = $event"/>

                <pre>{{newValues}}</pre>
                <span class="btn btn-info" @click="setNewValues">Submit new values</span>
                <span class="btn btn-danger" @click="deleteExpense">Delete Expense</span>
            </div>
        </div>
    </div>
</template>

<script>
    import ClickToEdit from "../../components/ClickToEdit";
    import { db } from "@/lib/Firebase";

    export default {
        name: "LinkedExpenseView",
        components: {ClickToEdit},
        data() {
            return {
                expense: {},
                newValues: {},
                user: db.collection('workers').doc(this.$store.state.firebaseAccount.userID)

            }
        },
        async mounted() {
            await this.getExpense();
        },
        methods: {
            async getExpense() {
                const expenseRef = await this.user.collection('jobs').doc(this.$route.params.job_id).collection('expenses').doc(this.$route.params.expense_id).get()
                if (expenseRef.exists) {
                    this.expense = expenseRef.data()
                    this.expense.id = expenseRef.id
                    this.$toast.info(`Found Job ${expenseRef.id}`)
                } else {
                    this.$toast.error("Job not found!")
                }
            },
            async setNewValues() {
                const newValuesRef = this.user.collection('jobs').doc(this.$route.params.job_id).collection('expenses').doc(this.$route.params.expense_id)
                await newValuesRef.set(this.newValues, { merge: true });
                this.getExpense()
                this.$toast.success("Done!")
            },
            async deleteExpense() {
                this.user.collection("jobs").doc(this.expense.linkedToJob).collection("expenses").doc(this.expense.id).delete().then(() => {
                    this.expense = {}
                    this.$toast.info("Document successfully deleted!");
                }).catch((error) => {
                    this.$toast.error(`Error removing document: ${error}`);
                });
            },
        }
    }
</script>

<style scoped>

</style>