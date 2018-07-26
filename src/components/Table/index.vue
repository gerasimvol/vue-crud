<template>
  <div>
    {{ itemsList }}
  </div>
</template>

<script>
  import { mapState } from 'vuex'

  export default {
    name: 'Table',
    computed: {
      ...mapState({
        itemsList: state => state.itemsList
      })
    }
  }
</script>

<style scoped>

</style>
