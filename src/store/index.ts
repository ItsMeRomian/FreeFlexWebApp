import { createStore } from 'vuex'
import createPersistedState from "vuex-persistedstate";
import {db} from "@/lib/Firebase";
import {CalculateJob} from "@/lib/CalculateJob";

export default createStore({
  state: {
    count: 1,
    loggedIn: false,
    loggedInUser: null,
    firebaseAccount: null,
    userID: "",
    userPhotoURL: null,
    userFullName: null,
    jobs: {},
    wantsLiveData: false,
    doRefresh: false,
    lastRefresh: 0,
  },
  mutations: {
    setDoRefresh(state,value) {
      state.doRefresh = value
    },
    setLastRefresh(state, value) {
      state.lastRefresh = value
    },
    setJobs(state, value) {
      console.log('runningSetJobs')
      state.lastRefresh = new Date().getTime();
      state.jobs = value
    },
    setLoggedIn(state, value) {
      state.loggedIn = value;
    },
    setUserID(state, value) {
      state.userID = value;
    },
    setUserPhotoURL(state, value) {
      state.userPhotoURL = value;
    },
    setUserFullName(state, value) {
      state.userFullName = value;
    },
    setLoggedInUser(state, value) {
      state.loggedInUser = value;
    },
    setFirebaseAccount(state, value) {
      state.firebaseAccount = value;
    },
    doLogout(state) {
      state.loggedIn = false;
      state.loggedInUser = null;
      state.firebaseAccount = null;
      state.jobs = [];
    },
    checkAccess(state) {
      return state.loggedIn;
    },
    increment (state) {
      state.count++;
    }
  },
  actions: {
    async refreshData({ commit, state }) {
      //TODO: Make this typed
      const jobs = Array<any>()
      const ref = await db.collection('workers').doc(state.userID).collection('jobs').get()
      ref.forEach((i) => {
        const job = i.data()
        job.id = i.id
        // @ts-ignore
        job.calculator = new CalculateJob(i.data())
        jobs.push(job)
      })
      console.table(jobs)
      commit('setLastRefresh', new Date().getTime())
      commit('setDoRefresh', false)
      commit('setJobs', jobs)
    },
  },
  plugins: [createPersistedState()],
})