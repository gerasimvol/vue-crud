<template>
  <div id="app">
    <v-app>
      <v-flex lg8 offset-lg2 class="content">
        <transition name="fade">
          <router-view />
        </transition>
      </v-flex>
    </v-app>
  </div>
</template>

<script>
  export default {
    name: 'App',
    created () {
      console.info('Hello guys from DAXX ✌')
    }
  }
</script>

<style lang="scss" scoped>
  .content {
    padding: 10px;
  }

  .fade {
    &-enter-active,
    &-leave-active {
      transition: all .35s;
    }
    &-enter,
    &-leave-to {
      position: absolute;
      transform: translateY(30px);
      opacity: 0;
    }
  }
</style>
