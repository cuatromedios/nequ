<template>
  <div id="q-app">
    <router-view />
  </div>
</template>

<script>
export default {
  name: 'App',
  async mounted () {
    this.$api.baseURL = process.env.API_URL
  }
}
</script>
