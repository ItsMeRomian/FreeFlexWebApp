import "@/plugins/supabase.client.js";

export default function ({ app, route, redirect, store }) {
  if (!app.$supabase.auth.session() && route.name !== "login") {
    console.error("User tried accessing a auth page while not logged in.");
    app.$toast.error("Im sorry, you need to login.");
    return redirect("/login");
  }

  if (app.$supabase.auth.session() && route.name === "login") {
    console.error("User tried accessing login page while logged in.");
    app.$toast.success("Welcome! your already logged in.");
    return redirect("/secure");
  }

  if (route.name !== "account" && !store.state.profile) {
    console.error("User tried accessing a auth page while not having profile.");
    app.$toast.error("Im sorry, you need a profile.");
    return redirect("/account");
  }
}
