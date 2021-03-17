import { createStore } from 'vuex'
import createPersistedState from "vuex-persistedstate";

export default createStore({
  state: {
    count: 1,
    loggedIn: false,
    loggedInUser: null,
    firebaseAccount: null,
  },
  mutations: {
    setLoggedIn(state, value) {
      state.loggedIn = value;
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
    },
    increment (state) {
      state.count++;
    }
  },
  plugins: [createPersistedState()],
})