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
                                <label class="col control-label" for="linkedToJob">linkedToJob</label>
                                <div class="col">
                                    <input disabled id="linkedToJob" name="linkedToJob" type="text" placeholder="title" class="form-control input-md" v-model="input.linkedToJob">
                                    <span class="help-block">title</span>
                                </div>
                            </div>
                            <div class="form-group">
                                <label class="col control-label" for="name">title</label>
                                <div class="col">
                                    <input id="name" name="name" type="text" placeholder="title" class="form-control input-md" v-model="input.name">
                                    <span class="help-block">title</span>
                                </div>
                            </div>
                            <div class="form-group">
                                <label class="col control-label" for="amount">rate</label>
                                <div class="col">
                                    <input id="amount" name="amount" type="text" placeholder="rate" class="form-control input-md" v-model="input.amount">
                                </div>
                            </div>
                            <div class="form-group">
                                <label class="col control-label" for="btwReduct">date</label>
                                <div class="col">
                                    <input id="btwReduct" name="btwReduct" type="text" placeholder="placeholder" class="form-control input-md" v-model="input.btwReduct">
                                </div>
                            </div>
                        </div>
                        <pre class="col">
                            {{input}}
                        </pre>
                    </div>
                </fieldset>
                <span @click="createJob">Create Expense</span>
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
                input: {
                    linkedToJob: this.$route.params.id,
                    name: "string",
                    amount: 13,
                    btwReduct: 21,
                }
            }
        },
        methods: {
            async createJob() {
                const userRef = db.collection('workers').doc(this.$store.state.loggedInUser.xR);
                const res = await userRef.collection('jobs').doc(this.$route.params.id).collection('expenses').add(this.input)
                console.log("created expense with " + res.id)
            },
        }
    }
</script>

<style scoped>

</style>