import Vue from 'vue'
import Vuex from 'vuex'
import VueResource from 'vue-resource'
const R = require('ramda')

Vue.use(VueResource)
Vue.use(Vuex)

const parcelsModule = {
  state: {
    data: [],
    filteredData: [],
    searchPhrase: '',
    selectAll: false,
    checkedCount: null
  },
  getters: {
    parcelsList (state) {
      return state.data
    },
    searchPhrase (state) {
      return state.searchPhrase
    },
    filteredList (state) {
      return state.filteredData
    },
    checkedCount (state) {
      return state.checkedCount
    }
  },
  mutations: {
    CLEAR_PARCELS_LIST (state, parcelsList) {
      state.data = []
      state.filteredData = []
    },
    GET_PARCELS (state, parcelsList) {
      state.data = R.concat(state.data, parcelsList)
    },
    SELECT_ALL_PARCELS (state) {
      state.selectAll = !state.selectAll
      if (state.searchPhrase === '' && state.selectAll) {
        state.data.forEach(function (item) {
          state.checkedCount = state.data.length
          item.props.checked = true
        })
      } else if (state.searchPhrase === '' && !state.selectAll) {
        state.data.forEach(function (item) {
          state.checkedCount = 0
          item.props.checked = false
        })
      } else if (state.searchPhrase !== '' && state.selectAll) {
        state.filteredData.forEach(function (item) {
          state.checkedCount = state.filteredData.length
          item.props.checked = true
        })
      } else {
        console.log(state.filteredData)
        state.filteredData.forEach(function (item) {
          state.checkedCount = 0
          item.props.checked = false
        })
      }
    },
    FILTER_PARCELS_BY (state, value) {
      state.searchPhrase = value.toLowerCase().trim()
      if (state.searchPhrase === '') {
        state.filteredData = []
      } else {
        let bySender = item =>
          R.contains(state.searchPhrase, item.sender.toLowerCase()) === true ||
          R.contains(state.searchPhrase, item.code.toLowerCase()) === true ||
          R.contains(state.searchPhrase, item.from.toLowerCase()) === true ||
          R.contains(state.searchPhrase, item.to.toLowerCase()) === true
        state.filteredData = R.filter(bySender, state.data)
      }
    },
    CHANGE_CHECKED_COUNTER (state, value) {
      if (value) {
        state.checkedCount++
      } else {
        state.checkedCount--
      }
    }
  },
  actions: {
    getParcels ({commit}) {
      console.log(123)
      Vue.http.get('parcels').then(
        (response) => {
          let parcels = response.body.data
          parcels.forEach(function (item) {
            item.props = {checked: false}
          })
          commit('GET_PARCELS', parcels)
        },
        (error) => {
          console.error(error)
        }
      )
    }
  }
}

export default parcelsModule
