<template>
  <v-card class="item">
    <v-card-title>
      <h1>{{ pageTitle }}</h1>
    </v-card-title>

    <v-card-text>
      <v-text-field
        v-model="item.name"
        label="Name"
        :error-messages="getErrors('name')"
        @input="$v.item.name.$touch()"
        @blur="$v.item.name.$touch()"
      />
      <v-textarea
        label="Description"
        v-model="item.desc"
        :error-messages="getErrors('desc')"
        @input="$v.item.desc.$touch()"
        @blur="$v.item.desc.$touch()"
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
  import { validationMixin } from 'vuelidate'
  import { mapGetters, mapActions } from 'vuex'
  import { required } from 'vuelidate/lib/validators'

  export default {
    name: 'Item',
    mixins: [validationMixin],
    data () {
      return {
        item: {
          id: '',
          name: '',
          desc: ''
        }
      }
    },
    validations: {
      item: {
        id: { required },
        name: { required },
        desc: { required }
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
        } else {
          const uniqueId = new Date().getTime()
          this.item.id = uniqueId
        }
      },
      onSubmit () {
        this.$v.$touch()
        if (this.$v.$invalid) return

        const submitAction = this.mode === 'edit'
          ? this.updateItem
          : this.createItem
        submitAction(this.item)
      },
      onCancel () {
        this.$router.push({ name: 'home' })
      },
      getErrors (field) {
        const errors = []
        if (!this.$v.item[field].$dirty) return errors
        !this.$v.item[field].required && errors.push('This field is required.')
        return errors
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
