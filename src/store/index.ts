import { createStore } from 'vuex'
import createPersistedState from "vuex-persistedstate";

export default createStore({
  state: {
    count: 1,
    loggedIn: false,
    loggedInUser: null
  },
  mutations: {
    setLoggedIn(state, value) {
      state.loggedIn = value;
    },
    setLoggedInUser(state, value) {
      state.loggedInUser = value;
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