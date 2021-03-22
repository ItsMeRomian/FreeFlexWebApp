import { createStore } from 'vuex'
import createPersistedState from "vuex-persistedstate";

export default createStore({
  state: {
    count: 1,
    loggedIn: false,
    loggedInUser: null,
    firebaseAccount: null,
    userID: null
  },
  mutations: {
    setLoggedIn(state, value) {
      state.loggedIn = value;
    },
    setUserID(state, value) {
      state.userID = value;
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
    },
    checkAccess(state) {
      return state.loggedIn;
    },
    increment (state) {
      state.count++;
    }
  },
  plugins: [createPersistedState()],
})