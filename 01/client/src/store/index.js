import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    authenticated: false,
    userFullName: null,
    roles: [],
    busy: false,
    value: null,
    showSaveSuccessMessage: false,
    showSaveFailureMessage: false
  },
  mutations: {
    setBusy (state) {
      state.busy = true
    },
    clearBusy (state) {
      state.busy = false
    },
    saveSuccessful (state) {
      state.showSaveSuccessMessage = true
    },
    saveFailed (state) {
      state.showSaveFailureMessage = true
    },
    resetSaveStatus (state) {
      state.showSaveSuccessMessage = false
      state.showSaveFailureMessage = false
    },
    setValue (state, value) {
      state.value = value
    },
    setAuthenticated (state, value) {
      state.authenticated = value
    },
    setUser (state, profile) {
      state.userFullName = profile.name
      if (profile.role) {
        Array.isArray(profile.role)
          ? state.roles.push(...profile.role)
          : state.roles.push(profile.role)
      }
    }
  },
  actions: {
    async save ({ commit, state }) {
      commit('resetSaveStatus')
      commit('setBusy')
      try {
        await axios.post('api/values', { value: state.value })
        commit('saveSuccessful')
      } catch {
        commit('saveFailed')
      } finally {
        commit('clearBusy')
      }
    }
  }
})
