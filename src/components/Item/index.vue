<template>
  <v-card>
    <v-card-text>
      {{ item }}
    </v-card-text>
    <v-btn>Hello</v-btn>
  </v-card>
</template>

<script>
  import { mapGetters, mapActions } from 'vuex'

  export default {
    name: 'Item',
    data () {
      return {
        item: {
          id: '',
          name: '',
          desc: ''
        }
      }
    },
    computed: {
      ...mapGetters([
        'getItemById'
      ]),
      mode () {
        return this.$route.params.id !== 'new'
          ? 'edit'
          : 'create'
      }
    },
    methods: {
      ...mapActions([
        'updateItem',
        'createItem'
      ]),
      initItem () {
        if (this.mode === 'edit') {
          this.item = this.getItemById(this.$route.params.id)
        }
      },
      submit () {
        const submitAction = this.mode === 'edit'
          ? this.updateItem
          : this.createItem
        submitAction(this.item)
      },
      cancel () {
        this.$route.push({ name: 'home' })
      }
    },
    created () {
      this.initItem()
    }
  }
</script>

<style scoped>

</style>
