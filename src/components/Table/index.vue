<template>
  <div>
    <v-data-table
      :headers="headers"
      :items="itemsList"
      hide-actions
      class="elevation-1"
    >
      <template slot="items" slot-scope="props">
        <td>{{ props.item.id }}</td>
        <td>{{ props.item.name }}</td>
        <td>{{ props.item.desc | preview }}</td>
        <td>
          <v-icon
            color="primary"
            @click="onEdit(props.item.id)"
          >
            edit
          </v-icon>
          <v-icon
            color="error"
            @click="onDelete(props.item.id)"
          >
            delete
          </v-icon>
        </td>
      </template>
    </v-data-table>

    <div class="justify-center layout px-0">
      <v-btn
        color="success"
        :to="{ path: '/item/new' }"
      >
        Create item
      </v-btn>
    </div>

    <v-dialog
      v-model="confirmDelete.modal"
      max-width="290"
    >
      <v-card>
        <v-card-title>
          <h2 class="text-xs-center">Are you sure you want to delete this item?</h2>
        </v-card-title>
        <v-layout justify-center>
          <v-card-actions>
            <v-btn
              @click="clearConfirmDeleteModal"
            >
              Cancel
            </v-btn>
            <v-btn
              color="error"
              @click="onConfirmDelete"
            >
              Delete
            </v-btn>
          </v-card-actions>
        </v-layout>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
  import { mapState, mapActions } from 'vuex'

  export default {
    name: 'Table',
    data () {
      return {
        headers: [
          {
            text: 'ID',
            align: 'left',
            sortable: false,
            value: 'id'
          },
          {
            text: 'Name',
            align: 'left',
            value: 'name'
          },
          {
            text: 'Description',
            align: 'left',
            value: 'desc'
          },
          {
            text: 'Actions',
            value: 'id',
            sortable: false
          }
        ],
        confirmDelete: {
          modal: false,
          id: null
        }
      }
    },
    computed: {
      ...mapState({
        itemsList: state => state.itemsList
      })
    },
    methods: {
      ...mapActions([
        'deleteItem'
      ]),
      onEdit (id) {
        this.$router.push({ path: `/item/${id}` })
      },
      onDelete (id) {
        this.confirmDelete = {
          modal: true,
          id
        }
      },
      onConfirmDelete () {
        this.deleteItem(this.confirmDelete.id)
        this.clearConfirmDeleteModal()
      },
      clearConfirmDeleteModal () {
        this.confirmDelete = {
          modal: false,
          id: null
        }
      }
    },
    filters: {
      preview (value) {
        if (!value) return ''
        return value.length > 50
          ? `${value.slice(0, 50)}...`
          : value
      }
    }
  }
</script>
