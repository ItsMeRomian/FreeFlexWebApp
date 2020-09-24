<template>
  <div class="hello" style="border:solid">
    Menu
    <h1>{{ currentPage }}</h1>
  </div>
</template>

<script>
export default {
  name: 'Menu',
  props: {
    currentPage: String
  }
}
</script>

<style scoped>
</style>