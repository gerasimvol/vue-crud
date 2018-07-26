<template>
  <div id="app">
    <v-app>
      <div class="content">
        <router-view />
      </div>
    </v-app>
  </div>
</template>

<script>
  export default {
    name: 'App'
  }
</script>

<style lang="scss" scoped>
  .content {
    padding: 10px;
  }
</style>
