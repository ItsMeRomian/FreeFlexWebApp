<template>
  <div>
    <Menu loggedIn="true" />
    Secure2
  </div>
</template>
<script>
import Menu from "@/components/Menu.vue";
export default {
  name: "Secure2",
  components: {
    Menu,
  },
  methods: {},
};
</script>

<style scoped>
span {
  border: solid;
  padding: 1rem;
}
</style>
