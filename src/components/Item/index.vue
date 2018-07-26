<template>
  <v-card class="item">
    <v-card-title>
      <h1>{{ pageTitle }}</h1>
    </v-card-title>

    <v-card-text>
      <v-text-field
        v-model="item.name"
        label="Name"
      />
      <v-textarea
        label="Description"
        v-model="item.desc"
      />
    </v-card-text>

    <v-card-actions>
      <v-btn
        color="error"
        @click="onCancel"
      >
        Cancel
      </v-btn>
      <v-btn
        color="success"
        @click="onSubmit"
      >
        {{ submitBtnText }}
      </v-btn>
    </v-card-actions>
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
      },
      pageTitle () {
        return this.mode === 'edit'
          ? 'Edit item'
          : 'Create item'
      },
      submitBtnText () {
        return this.mode === 'edit'
          ? 'Save'
          : 'Create'
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
      onSubmit () {
        const submitAction = this.mode === 'edit'
          ? this.updateItem
          : this.createItem
        submitAction(this.item)
      },
      onCancel () {
        this.$router.push({ name: 'home' })
      }
    },
    created () {
      this.initItem()
    }
  }
</script>

<style lang="scss" scoped>
  .item {
    padding: 10px;
  }
</style>
