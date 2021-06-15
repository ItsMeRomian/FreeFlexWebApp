export default function ({ store, route, redirect }) {
  if (!store.state.user && route.name !== "login") {
    return redirect("/login");
  }
}
