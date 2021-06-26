export const state = () => ({
  user: null,
  session: null,
  profile: null,
});

export const mutations = {
  setUser(state, user) {
    state.user = user;
  },
  setSession(state, session) {
    state.session = session;
  },
  setProfile(state, profile) {
    state.profile = profile;
  },

  // onAuthStateChangedMutation: (state, { authUser, claims }) => {
  //   if (!authUser) {
  //     state.user = null;
  //   } else {
  //     console.log("else!");
  //     const { uid, email, emailVerified } = authUser;
  //     state.user = { uid, email, emailVerified };
  //   }
  //   console.log(authUser);
  //   console.log(claims);
  // },
};
// export const actions = {
//   nuxtServerInit({ commit }, { req }) {
//     console.log("HI1JA");
//     if (req.session.user) {
//       commit("user", req.session.user);
//     }
//   },
// };

export const getters = {
  getUser: (state) => state.user,
};
