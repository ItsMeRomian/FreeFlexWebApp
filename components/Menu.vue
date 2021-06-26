<template>
  <nav v-if="loggedIn === 'true'" class="navbar navbar-expand-lg navbar-dark bg-dark">
    <div class="container-fluid">
      <a class="navbar-brand" href="#">Navbar</a>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarColor02" aria-controls="navbarColor02" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>

      <div id="navbarColor02" class="collapse navbar-collapse">
        <ul class="navbar-nav me-auto">
          <li class="nav-item">
            <router-link class="nav-link" to="/home">Home</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/add/job">Add Job</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/add/client">Add Client</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/secure">secure</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/anotherSecure">secure2</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/view/client/all">View all clients</router-link>
          </li>
        </ul>
        <ul class="navbar-nav d-flex">
          <li class="nav-item">
            <router-link class="nav-link" to="/account">{{ getProfile.username }}</router-link>
          </li>
          <li class="nav-item">
            <a class="nav-link" @click="logout()">Logout</a>
          </li>
        </ul>
      </div>
    </div>
  </nav>
  <nav v-else-if="loggedIn === 'false'" class="navbar navbar-expand-lg navbar-dark bg-dark">
    <div class="container-fluid">
      <a class="navbar-brand" href="#">Navbar</a>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarColor02" aria-controls="navbarColor02" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>

      <div id="navbarColor02" class="collapse navbar-collapse">
        <ul class="navbar-nav me-auto">
          <li class="nav-item">
            <router-link class="nav-link" to="/home">Home</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/add/job">Add Job</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/add/client">Add Client</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/secure">secure</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/anotherSecure">secure2</router-link>
          </li>
        </ul>
        <ul class="navbar-nav d-flex">
          <li class="nav-item">
            <router-link class="nav-link" to="/account">Logged out</router-link>
          </li>
          <li class="nav-item">
            <a class="nav-link" @click="logout()">Logout</a>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>
<script>
export default {
  name: "Menu",
  props: ["loggedIn"],
  computed: {
    getUser() {
      return this.$store.state.user;
    },
    getProfile() {
      return this.$store.state.profile;
    },
  },
  methods: {
    logout() {
      this.$supabase.auth.signOut();
    },
  },
};
</script>
