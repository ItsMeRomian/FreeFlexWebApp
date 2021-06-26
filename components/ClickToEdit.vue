<template>
  <input
    v-if="edit"
    v-focus=""
    type="text"
    :value="valueLocal"
    @blur="
      valueLocal = $event.target.value;
      edit = false;
      $emit('input', valueLocal);
    "
    @keyup.enter="
      valueLocal = $event.target.value;
      edit = false;
      $emit('input', valueLocal);
    "
  />
  <span v-else @click="edit = true"> {{ valueLocal }}<sup class="bi bi-pencil-fill"></sup> </span>
</template>
<script>
export default {
  directives: {
    focus: {
      inserted(el) {
        el.focus();
      },
    },
  },
  props: ["value"],
  data() {
    return {
      edit: false,
      valueLocal: this.value,
    };
  },
  watch: {
    value() {
      this.valueLocal = this.value;
    },
    valueLocal() {
      this.changedData();
    },
  },
  methods: {
    changedData() {
      this.$emit("changedData", this.valueLocal);
    },
  },
};
</script>
<style scoped>
sup {
  font-size: 50%;
  margin-left: 0.2rem;
}
</style>
