<template>
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
                  <input id="title" v-model="input.title" name="title" type="text" placeholder="title" class="form-control input-md" />
                  <span class="help-block">title</span>
                </div>
              </div>
              <div class="form-group">
                <label class="col control-label" for="rate">rate</label>
                <div class="col">
                  <input id="rate" v-model.number="input.rate" name="rate" placeholder="rate" type="number" class="form-control input-md" />
                </div>
              </div>
              <div class="form-group">
                <div class="form-group row">
                  <div class="col">
                    <label class="col control-label">date</label>
                    <!-- <datepicker v-model="input.date" :locale="locale" /> -->
                  </div>
                  <div class="col">
                    <label class="col control-label">period</label>
                    <input v-model="input.period" disabled class="form-control input-md" />
                  </div>
                </div>
              </div>
              <div class="form-group">
                <label class="col control-label" for="start">start</label>
                <div class="col">
                  <input id="start" v-model="input.start" name="start" type="text" placeholder="placeholder" class="form-control input-md" />
                </div>
              </div>
              <div class="form-group">
                <label class="col control-label" for="pauze">break</label>
                <div class="col">
                  <input id="pauze" v-model="input.pauze" name="pauze" type="text" placeholder="placeholder" class="form-control input-md" />
                </div>
              </div>
              <div class="form-group">
                <label class="col control-label" for="end">end</label>
                <div class="col">
                  <input id="end" v-model="input.end" name="end" type="text" placeholder="placeholder" class="form-control input-md" />
                </div>
              </div>
              <div class="form-group">
                <label class="col control-label" for="client">client</label><span v-if="!input.client_id" class="bg-danger">Bro? ben je dom? invullen daggoe</span>
                <div class="col">
                  <select id="client" v-model="input.client_id" name="client" @click="getClients">
                    <option v-for="client in clients" :key="client.id" :value="client.id">{{ client.name }}</option>
                    <option value="makeClient" @click="$router.push('/create/client')">Maak client...</option>
                    <!-- TODO: maak dit werkend -->
                  </select>
                </div>
              </div>
              <div class="form-group">
                <label class="col control-label" for="worker">worker</label>
                <div class="col">
                  <input id="worker" v-model="input.user_id" disabled name="worker" type="text" placeholder="placeholder" class="form-control input-md" />
                </div>
              </div>
              <span class="btn btn-success" @click="createJob">Create Job</span>
            </div>
            <div class="col">
              <div class="form-group">
                <label for="travel" class="col-4 col-form-label">Travel?</label>
                <div class="col-8">
                  <select id="travel" v-model="input.travel" name="travel" class="custom-select" required="required">
                    <option value="true">True</option>
                    <option value="false">False</option>
                  </select>
                </div>
              </div>
              <div class="form-group">
                <label class="col-4 col-form-label" for="distance">Distance</label>
                <div class="col-8">
                  <input id="distance" v-model.number="input.distance" name="distance" placeholder="67" type="number" class="form-control" required="required" />
                </div>
              </div>
              <div class="form-group">
                <label class="col control-label" for="client">cars</label><span v-if="!input.car" class="bg-danger">Bro? </span>
                <div class="col">
                  <select id="client" v-model="input.car_id" name="client" @click="getCars">
                    <option v-for="car in cars" :key="car.id" :value="car.id">{{ car.name }}</option>
                    <option value="makeCar" @click="$router.push('/create/car')">Maak car...</option>
                    <!-- TODO: maak dit werkend -->
                  </select>
                </div>
              </div>
              <div class="form-group">
                <label for="double" class="col-4 col-form-label">Double?</label>
                <div class="col-8">
                  <select id="double" v-model="input.double" name="double" class="custom-select">
                    <option value="true">double</option>
                    <option value="false">dont double</option>
                  </select>
                </div>
              </div>
              <div class="form-group">
                <label for="factoring" class="col-4 col-form-label">factoring?</label>
                <div class="col-8">
                  <select id="factoring" v-model="input.factoring" name="factoring" class="custom-select" required="required">
                    <option value="true">True</option>
                    <option value="false">False</option>
                  </select>
                </div>
              </div>
              <div class="form-group">
                <label class="col-4 col-form-label" for="factoringPercentage">factoringPercentage</label>
                <div class="col-8">
                  <input id="factoringPercentage" v-model.number="input.factoring_percentage" name="factoringPercentage" placeholder="2.9" type="number" class="form-control" required="required" />
                </div>
              </div>
              <div class="form-group">
                <label class="col-4 col-form-label" for="daysToPay">daysToPay?</label>
                <div class="col-8">
                  <input id="daysToPay" v-model.number="input.daysToPay" disabled name="daysToPay" placeholder="4" type="number" class="form-control" required="required" />
                </div>
              </div>
            </div>
          </div>
        </fieldset>
      </form>
    </div>
    <div class="col">
      <pre>{{ input }}</pre>
      <div class="btn btn-danger" @click="getClientName()">GETCLIENTNAME</div>
      <div class="btn btn-info" @click="setInputPeriod()">setInputPeriod</div>
    </div>
  </div>
</template>
<script>
// import moment from "moment";
import { PeriodCalculator } from "@/assets/PeriodCalculator";

export default {
  name: "JobCreate",
  components: {
    // Datepicker,
  },
  data() {
    return {
      locale: "nl",
      input: {
        title: "string",
        rate: 13,
        date: "2021-10-10", // new Date(),
        start: "18:00",
        end: "23:00",
        break: "00:30",
        client_id: "",
        user_id: this.$store.state.user.id,
        address: "string",
        distance: 51,
        car_id: 0,
        factoring_percentage: 2.9,
        daysToPay: 4,
        btw_percentage: 21,
      },
      clients: [],
      cars: [],
    };
  },
  computed: {
    inputDate() {
      return this.input.date;
    },
  },
  watch: {
    inputDate() {
      this.input.period = new PeriodCalculator(this.input.date).today();
    },
  },
  methods: {
    setInputPeriod() {
      this.input.period = new PeriodCalculator(this.input.date).today();
    },
    async createJob() {
      const { error } = await this.$supabase.from("jobs").insert([this.input]);
      if (!error) {
        this.$toast.success("Made Job!!");
      }
    },
    async getClients() {
      if (this.clients.length === 0) {
        const { data, error } = await this.$supabase.from("clients").select();
        if (error) this.$toast.error(error);
        this.clients = data;
        if (this.clients.length) {
          this.$toast.success(`Gotten list of clients (${this.clients.length})`);
        } else {
          this.$toast.error("Failed to get list of clients. Maybe none?");
        }
      }
    },
    async getCars() {
      if (this.cars.length === 0) {
        const { data, error } = await this.$supabase.from("cars").select();
        if (error) this.$toast.error(error);
        this.cars = data;
        if (this.cars.length) {
          this.$toast.success(`Gotten list of cars (${this.cars.length})`);
        } else {
          this.$toast.error("Failed to get list of cars. Maybe none?");
        }
      }
    },
  },
};
</script>

<style scoped></style>
