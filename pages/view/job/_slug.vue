<template>
  <div class="jobView" v-if="job.calculator && formatter">
    <Menu loggedIn="true" />
    <div class="container">
      <div class="row">
        <div class="col">
          <div class="row">
            <div class="col">
              <b>{{ job.calculator.formatTime().format("DD MMM YYYY") }} · {{ job.start }} - {{ job.end }}</b>
              <br />
              <span class="badge bg-success" v-if="job.payed">Payed</span>
              <span class="badge bg-danger" v-if="!job.payed">Not Payed</span>
              <span class="mx-1" />
              <span class="badge bg-success" v-if="job.checkedOut">Checked Out</span>
              <span class="badge bg-danger" v-if="!job.checkedOut">Not Checked Out</span>
              <h3 class="display-6"><ClickToEdit :value="job.title" @changedData="newValues.title = $event" /></h3>
              <h3>
                For <router-link :to="'/view/client/' + job.client">{{ job.clientName }}</router-link>
              </h3>
              <!-- <Stars :rating="job.rating" /> -->
              <div class="buttonList my-3">
                <p>Available Actions:</p>
                <hr />
                <span class="btn btn-success" @click="setNewValues" v-if="true">Submit new Values</span>
                <router-link class="btn btn-success mx-1" v-if="!job.checkedOut && job.calculator.isJobInPast()" :to="'/view/job/' + job.id + '/checkout'">Checkout</router-link>
                <span class="btn btn-success mx-1" v-if="!job.payed && job.checkedOut && job.calculator.isJobInPast()" @click="setJobPayed">Set Job to Payed</span>
                <span class="btn btn-danger mx-1" @click="deleteJob">Delete</span>
                <hr />
              </div>
            </div>
          </div>
          <div class="row">
            <div class="col">
              <p class="lh-lg h5">
                <i class="bi bi-calendar-check"></i> Client has <b><ClickToEdit :value="job.daysToPay" @changedData="newValues.daysToPay = $event" /></b> days to pay<br />
                <i class="bi bi-cash"></i> For <b>€<ClickToEdit :value="job.rate" @changedData="newValues.rate = $event" /></b> p/u<br />
                <i class="bi bi-check-circle-fill"></i>
                You have been planned from
                <b v-if="!job.oldStart"><ClickToEdit :value="job.start" @changedData="newValues.start = $event" /></b>
                <b v-else>{{ job.oldStart }}</b>
                till
                <b v-if="!job.oldEnd"><ClickToEdit :value="job.end" @changedData="newValues.end = $event" /></b>
                <b v-else>{{ job.oldEnd }}</b>
                , and took a break of
                <b v-if="!job.oldPauze"><ClickToEdit :value="job.break" @changedData="newValues.pauze = $event" /></b>
                <b v-else>{{ job.oldPauze }}</b>
                <br />
                <span v-if="job.isCheckedOut"><i class="bi bi-check-circle-fill"></i> You have checked out ({{ job.start }} - {{ job.end }}, with {{ job.break }} break)<br /></span>
                <span v-else><i class="bi bi-check-circle"></i> You have not checked out<br /></span>
                <i class="bi bi-check-circle" v-if="!job.isPayed"></i>
                <i class="bi bi-check-circle-fill" v-else></i>
                You have till <b>{{ job.calculator.formatTime().add(job.daysToPay, "d").format("DD MMM YYYY") }}</b> to get payed<br />
                <i class="bi bi-check-circle" v-if="!job.isPayed"></i>
                <i class="bi bi-check-circle-fill" v-else></i>
                <b>{{ formatter.money(job.calculator.getSubInclBTW()) }}</b> will appear on your bank account<br />
              </p>
            </div>
          </div>
        </div>
        <div class="col-5 text-end">
          <div class="row">
            <div class="col">
              <!-- <GoogleMapsUI :zoom="10" :address="job.address" style="border: solid 5px; border-radius: 5px" /> -->
              <h4><ClickToEdit :value="job.address" @changedData="newValues.address = $event" /></h4>
              <p v-if="job.calculator.getKMs()">
                Drove {{ job.calculator.getKMs() }}KM's with <i class="bi bi-cart-fill"> 91-PL-XD</i><br />
                That's €{{ job.calculator.getKMAllowance() }} kilometer allowance.
              </p>
            </div>
          </div>
          <div class="row">
            <div class="col mt-5">
              <table class="table">
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
                    <td>{{ job.title }}</td>
                    <td>{{ formatter.money(job.calculator.getExclBTW()) }}</td>
                    <td>{{ formatter.money(job.calculator.getBTW()) }}</td>
                    <td>{{ formatter.money(job.calculator.getInclBTW()) }}</td>
                  </tr>
                  <tr v-if="job.factoringPercentage">
                    <td>Factoring (<ClickToEdit :value="job.factoringPercentage" @changedData="newValues.factoringPercentage = $event" />%)</td>
                    <td>{{ formatter.money(job.calculator.getFactoringExclBTW(), "-") }}</td>
                    <td>{{ formatter.money(job.calculator.getFactoringBTW(), "-") }}</td>
                    <td>{{ formatter.money(job.calculator.getFactoringInclBTW(), "-") }}</td>
                  </tr>
                  <tr v-else>
                    <td><router-link to="al">Add Factoring</router-link></td>
                  </tr>
                  <tr>
                    <td><b>Subtotaal</b></td>
                    <td>{{ formatter.money(job.calculator.getSubExclBTW()) }}</td>
                    <td>{{ formatter.money(job.calculator.getSubBTW()) }}</td>
                    <td>{{ formatter.money(job.calculator.getSubInclBTW()) }}</td>
                  </tr>
                  <tr v-for="expense in expenses" :key="expense.id">
                    <td>
                      Expense <router-link :to="'/view/job/' + job.id + '/expense/' + expense.id">{{ expense.id.substring(0, 5) }}</router-link
                      >...
                    </td>
                    <td>{{ formatter.money(expense.calculator.getExclBTW()) }}</td>
                    <td>{{ formatter.money(expense.calculator.getBTW()) }}</td>
                    <td>{{ formatter.money(expense.calculator.getInclBTW()) }}</td>
                  </tr>
                  <tr v-if="!expenses.length">
                    <td><router-link :to="'/create/expense/' + $route.params.id">Add Expense</router-link></td>
                    <td></td>
                    <td></td>
                    <td></td>
                  </tr>
                  <tr>
                    <td><b>Total</b></td>
                    <td>{{ formatter.money(job.calculator.getSubExclBTW() + expensesTotals.totalExcl) }}</td>
                    <td>{{ formatter.money(job.calculator.getSubBTW() + expensesTotals.totalBTW) }}</td>
                    <td>{{ formatter.money(job.calculator.getSubInclBTW() + expensesTotals.totalIncl) }}</td>
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
          <pre class="col">{{ job }}</pre>
          <pre class="col">{{ newValues }}</pre>
          <pre class="col">{{ expensesTotals }}</pre>
        </div>
      </div>
    </div>
  </div>
  <div v-else>
    LOADING
    <!-- <Loader fullPage="true"></Loader> -->
  </div>
</template>

<script>
//import Loader from "../../components/Loader";
//import GoogleMapsUI from "../../components/GoogleMapsUI";
//import { db } from "@/lib/Firebase";
import CalculateJob from "@/assets/CalculateJob";
import ClickToEdit from "@/components/ClickToEdit.vue";
//import { CalculateExpense } from "../../lib/CalculateExpense";
//import Stars from "../../components/Stars";
import Formatter from "@/assets/Formatter";
export default {
  async asyncData({ params }) {
    const slug = params.slug;
    return { slug };
  },

  name: "JobView",
  components: {
    //Loader, Stars,
    ClickToEdit,
    //GoogleMapsUI
  },
  data() {
    return {
      formatter: false,
      debugAccount: false,
      job: {},
      newValues: {},
      expenses: [],
      expensesTotals: {
        totalExcl: 0,
        totalBTW: 0,
        totalIncl: 0,
        total: 0,
      },
      toDeleteExpense: "",
    };
  },
  async mounted() {
    await this.getJob();
    //await this.getExpenses();
    this.formatter = new Formatter();
  },
  methods: {
    async getJob() {
      const { data, error } = await this.$supabase.from("jobs").select().match({ id: this.slug }).limit(1);
      if (!error) {
        this.job = data[0];
        //this.job.id = jobRef.id;
        this.job.calculator = new CalculateJob(data[0]);
        this.$toast.info(`Found Job `);
      } else {
        this.$toast.error("Job not found!");
      }
    },
    // async getExpenses() {
    //   const expensesRef = await this.user.collection("jobs").doc(this.$route.params.id).collection("expenses").get();
    //   expensesRef.forEach((doc) => {
    //     this.expenses.push({
    //       id: doc.id,
    //       data: doc.data(),
    //       calculator: new CalculateExpense(doc.data()),
    //     });
    //   });
    //   this.getExpensesTotals();
    // },
    // getExpensesTotals() {
    //   this.expenses.forEach((expense) => {
    //     this.expensesTotals.totalExcl += expense.calculator.getExclBTW();
    //     this.expensesTotals.totalBTW += expense.calculator.getBTW();
    //     this.expensesTotals.totalIncl += expense.calculator.getInclBTW();
    //   });
    //   this.expensesTotals.total = this.expenses.length;
    // },
    async setNewValues() {
      console.log(this.newValues, this.slug);
      const { data, error } = await this.$supabase.from("jobs").update(this.newValues).match({ id: this.slug });
      console.log(data, error);
      await this.getJob();
      this.$toast.success("Updated Job!");
    },
    async setJobPayed() {
      const newValuesRef = this.user.collection("jobs").doc(this.$route.params.id);
      await newValuesRef.set({ isPayed: true }, { merge: true });
      await this.getJob();
      this.$store.dispatch("refreshData");
      this.$toast.info(`Refreshing data...`);
      this.$toast.success("Done!");
    },
    async deleteJob() {
      if (!this.expenses.length) {
        this.user
          .collection("jobs")
          .doc(this.job.id)
          .delete()
          .then(() => {
            delete this.job;
            this.$toast.info("Document successfully deleted!");
            this.$store.dispatch("refreshData");
            this.$toast.info(`Refreshing data...`);
          })
          .catch((error) => {
            this.$toast.error(`Error removing document: ${error}`);
          });
      } else {
        this.$toast.error("This job has expenses!");
      }
    },
  },
  watch: {
    toDeleteExpense: function () {
      this.user
        .collection("jobs")
        .doc(this.job.id)
        .collection("expenses")
        .doc(this.toDeleteExpense)
        .delete()
        .then(() => {
          this.$toast.info("Expense Deleted!!");
          this.expenses = [];
          this.toDeleteExpense = undefined;
          this.getExpenses();
          this.$store.dispatch("refreshData");
          this.$toast.info(`Refreshing data...`);
        })
        .catch((error) => {
          this.$toast.error(`Error removing document: ${error}`);
        });
    },
  },
};
</script>

<style scoped>
.bi {
  margin-right: 0.5rem;
}
</style>
