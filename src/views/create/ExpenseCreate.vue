<template>
    <span v-if="isLinkedToJob">Expense CREATE <span class="bg-danger">linked</span> to JOB</span>
    <span v-else>Expense CREATE <span class="bg-danger">UNLINKED</span></span>
    <div class="row">
        <div class="col">
            <form class="form-horizontal">
                <fieldset>
                    <div class="row">
                        <div class="col">
                            <legend>Form Name</legend>
                            <div class="form-group">
                                <label class="col control-label" for="linkedToJob">linkedToJob</label>
                                <div class="col">
                                    <input disabled id="linkedToJob" name="linkedToJob" type="text" placeholder="not" class="form-control input-md" v-model="input.linkedToJob">
                                    <span class="btn btn-info" @click="unlink" v-if="$route.params.id">UNLINK</span>
                                </div>
                            </div>
                            <div class="form-group">
                                <label class="col control-label" for="name">title</label>
                                <div class="col">
                                    <input id="name" name="name" type="text" placeholder="title" class="form-control input-md" v-model="input.name">
                                </div>
                            </div>
                            <div class="form-group">
                                <label class="col control-label" for="amount">rate</label>
                                <div class="col">
                                    <input id="amount" name="amount" type="number" placeholder="rate" class="form-control input-md" v-model.number="input.amount">
                                </div>
                            </div>
                            <div class="form-group">
                                <label class="col control-label" for="btwReduct">date</label>
                                <div class="col">
                                    <input id="btwReduct" name="btwReduct" type="number" placeholder="placeholder" class="form-control input-md" v-model.number="input.btwReduct">
                                </div>
                            </div>
                        </div>
                        <pre class="col">
                            {{input}}
                        </pre>
                    </div>
                </fieldset>
                <span @click="createExpenseLinkedToJob" class="btn btn-success" v-if="isLinkedToJob">Create Expense Linked to {{input.linkedToJob}}</span>
                <span @click="createExpenseUnlinked" class="btn btn-success" v-else>Create Expense unlinked</span>
            </form>
        </div>
    </div>
</template>

<script>
    import { db } from "@/lib/Firebase";

    export default {
        name: "ExpenseCreate",
        data() {
            return {
                isLinkedToJob: false,
                input: {
                    linkedToJob: this.$route.params.id,
                    name: "string",
                    amount: 13,
                    btwReduct: 21,
                }
            }
        },
        mounted() {
            this.isLinkedToJob = !!this.$route.params.id;
        },
        methods: {
            unlink() {
                this.isLinkedToJob = false;
                delete this.input.linkedToJob
                this.$router.push('/create/expense')
            },
            async createExpenseLinkedToJob() {
                const userRef = db.collection('workers').doc(this.$store.state.firebaseAccount.userID);
                const res = await userRef.collection('jobs').doc(this.$route.params.id).collection('expenses').add(this.input)
                if (res.id) {
                    console.log("created Expense with " + res.id)
                    this.$toast.success("Created Expense with ID: " + res.id)
                    this.$store.dispatch('refreshData')
                    this.$toast.info(`Refreshing data...`)
                } else {
                    console.error("Could not create Expense!")
                    this.$toast.error("Could not create Expense!")
                }
            },
            async createExpenseUnlinked() {
                delete this.input.linkedToJob
                const userRef = db.collection('workers').doc(this.$store.state.firebaseAccount.userID);
                const res = await userRef.collection('expenses').add(this.input)
                if (res.id) {
                    console.log("created Expense with " + res.id)
                    this.$toast.success("Created Expense with ID: " + res.id)
                } else {
                    console.error("Could not create Expense!")
                    this.$toast.error("Could not create Expense!")
                }
            },
        }
    }
</script>

<style scoped>

</style>