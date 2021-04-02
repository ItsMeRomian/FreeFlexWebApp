<template>
    <div class="jobView" v-if="job.calculator">
        <div class="row">
            <div class="col">
                <div class="row">
                    <div class="col">
                        <b>{{job.calculator.formatTime().format('d MMM YYYY')}} · {{job.start}} - {{job.end}}</b>
                        <br>

                        <span class="badge bg-success" v-if="job.isPayed">Payed</span>
                        <span class="badge bg-danger" v-if="!job.isPayed">Not Payed</span>
                        <span class="mx-1"/>
                        <span class="badge bg-success" v-if="job.isCheckedOut">Checked Out</span>
                        <span class="badge bg-danger" v-if="!job.isCheckedOut">Not Checked Out</span>

                        <h3 class="display-6">{{job.title}}</h3>
                        <h3>
                            For <router-link :to="'/view/client/'+job.client">{{job.clientName}}</router-link>
                        </h3>
                    </div>
                    <div class="col"><pre>{{newValues}}</pre></div>
                </div>
                <div class="row p-2">
                    <div class="col-6 bg-secondary">
                        <h3>Checkout</h3>
                        <div class="row ">
                            <div class="mb-3 col">
                                <label for="start" class="form-label">Started on</label>
                                <input type="email" class="form-control" id="start" v-model="newValues.start">
                            </div>
                            <div class="mb-3 col">
                                <label for="break" class="form-label">Took a break of</label>
                                <input class="form-control" id="break" v-model="newValues.pauze"/>
                            </div>
                        </div>
                        <div class="row">
                            <div class="mb-3 col">
                                <label for="end" class="form-label">Ended at</label>
                                <input type="email" class="form-control" id="end" v-model="newValues.end">
                            </div>
                            <div class="mb-3 col">
                                <label for="rating" class="form-label">What was your rating?</label>
                                <input class="form-control" id="rating" type="number" v-model.number="newValues.rating" min="1" max="5"/>
                            </div>
                        </div>
                        <div class="row">
                            <span class="btn btn-success" @click="submitCheckOut">Submit</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import {CalculateJob} from "../../lib/CalculateJob";
    import { db } from "@/lib/Firebase";

    export default {
        name: "JobCheckout",
        data() {
            return {
                job: {},
                user: db.collection('workers').doc(this.$store.state.firebaseAccount.userID),
                newValues: {
                    oldStart: "",
                    oldEnd: "",
                    oldPauze: "",
                    start: "17:00",
                    end: "21:00",
                    pauze: "00:30",
                    rating: 4.5,
                    isCheckedOut: true
                },
            }
        },
        async mounted() {
            await this.getJob();
            this.newValues.oldEnd = this.job.end
            this.newValues.oldPauze = this.job.pauze
            this.newValues.oldStart = this.job.start

            this.newValues.end = this.job.end
            this.newValues.pauze = this.job.pauze
            this.newValues.start = this.job.start
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
            async submitCheckOut() {
                const newValuesRef = this.user.collection('jobs').doc(this.$route.params.id);
                await newValuesRef.set(this.newValues, {merge: true});
                this.$toast.success("Done!")
                this.$router.push('/view/job/'+this.job.id)
            }
        }
    }
</script>

<style scoped>

</style>