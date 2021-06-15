export const state = () => ({
  counter: 0,
  user: {},
});

export const mutations = {
  increment(state) {
    state.counter++;
  },
  onAuthStateChangedMutation: (state, { authUser, claims }) => {
    if (!authUser) {
      state.user = null;
    } else {
      console.log("else!");
      const { uid, email, emailVerified } = authUser;
      state.user = { uid, email, emailVerified };
    }
    console.log(authUser);
    console.log(claims);
  },
};
export const getters = {
  getUser: (state) => state.user,
};
