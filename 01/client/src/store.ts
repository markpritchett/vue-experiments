import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";

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
      try {
        await axios.post("api/values", { value: state.value });
        commit("saveSuccessful");
      } catch {
        commit("saveFailed");
      } finally {
        commit("clearBusy");
      }
    }
  }
});
