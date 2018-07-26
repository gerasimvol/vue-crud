import Vue from 'vue'
import Vuex from 'vuex'
import * as types from './mutation-types'

Vue.use(Vuex)

const state = {
  itemsList: JSON.parse(localStorage.getItem('itemsList')) || []
}

const getters = {
  getItemById: state => id => state.itemsList.find(item => item.id === id)
}

const actions = {
  createItem ({ state, commit }, newItem) {
    const updatedItemsList = [
      ...state.itemsList,
      newItem
    ]
    commit(types.UPDATE_ITEMS_LIST, updatedItemsList)
  },

  updateItem ({ state, commit }, updatedItem) {
    const updatedItemsList = state.itemsList.map(item => {
      return item.id === updatedItem.id
        ? updatedItem
        : item
    })
    commit(types.UPDATE_ITEMS_LIST, updatedItemsList)
  },

  deleteItem ({ state, commit }, deletableItemId) {
    const updatedItemsList = state.itemsList.filter(item => item.id !== deletableItemId)
    commit(types.UPDATE_ITEMS_LIST, updatedItemsList)
  }
}

const mutations = {
  [types.UPDATE_ITEMS_LIST] (state, updatedItemsList) {
    state.itemsList = updatedItemsList
    localStorage.setItem('itemsList', JSON.stringify(updatedItemsList))
  }
}

export default new Vuex.Store({
  state,
  actions,
  mutations,
  getters
})
