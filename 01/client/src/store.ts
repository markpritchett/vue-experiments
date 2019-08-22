import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    busy: false,
    value: null,
    showSaveSuccessMessage: false,
    showSaveFailureMessage: false
  },
  mutations: {
    setBusy(state) {
      state.busy = true;
    },
    clearBusy(state) {
      state.busy = false;
    },
    saveSuccessful(state) {
      state.showSaveSuccessMessage = true;
    },
    saveFailed(state) {
      state.showSaveFailureMessage = true;
    },
    resetSaveStatus(state) {
      state.showSaveSuccessMessage = false;
      state.showSaveFailureMessage = false;
    },
    setValue(state, value) {
      state.value = value;
    }
  },
  actions: {
    async save({ commit, state }) {
      commit("resetSaveStatus");
      commit("setBusy");
      const response = await fetch("api/values", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(state.value)
      });

      commit("clearBusy");

      if (response.status === 200) {
        commit("saveSuccessful");
      } else {
        commit("saveFailed");
      }
    }
  }
});
