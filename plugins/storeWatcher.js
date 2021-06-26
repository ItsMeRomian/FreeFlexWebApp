console.log("hello");

export default async ({ app, store, redirect }) => {
  app.$supabase.auth.onAuthStateChange(async (event) => {
    console.log("CHANGE", event);
    if (event === "SIGNED_IN") {
      store.commit("setUser", app.$supabase.auth.user());
      const { data } = await app.$supabase.from("profile");
      store.commit("setProfile", data[0]);
      store.commit("setSession", app.$supabase.auth.session());
      redirect("/secure");
    }
    if (event === "SIGNED_OUT") {
      store.commit("setUser", null);
      redirect("/login");
    }
  });

  // Check if user is set in state.
  if (app.$supabase.auth.session()) {
    if (!store.state.user) {
      console.log("user not set, setting...");
      store.commit("setUser", app.$supabase.auth.user());
    } else {
      console.log("user already set");
      console.log(app.$supabase.auth.session());
      console.log(store.state.user);
    }

    // Check if session is set in state.
    if (!store.state.session) {
      console.log("session not set, setting...");
      store.commit("setSession", app.$supabase.auth.session());
    } else {
      console.log("session already set");
      console.log(store.state.session);
    }

    // Check if the profile is set in state. if not redirect to /profile to make one.
    if (!store.state.profile) {
      console.log("Profile not set, setting...");
      const { data, error } = await app.$supabase.from("profile");
      if (error) app.$toast.error(error);
      store.commit("setProfile", data[0]);
    } else {
      console.log("Profile already set");
      console.log(store.state.Profile);
    }
  } else {
    console.error("No session has been started!");
  }
};
