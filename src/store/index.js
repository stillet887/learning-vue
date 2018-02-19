import Vue from 'vue';
import Vuex from 'vuex';
import createPersistedState from 'vuex-persistedstate'

Vue.use(Vuex);

export default new Vuex.Store({
  plugins: [createPersistedState()],
  state: {
    currentPage: 1,
    currentLimit: 1,
    showModal: false
  },
  mutations: {
    changePage(state, payload) {
      state.currentPage = payload;
    },
    changeLimit(state, payload) {
      state.currentLimit = payload;
    }
  },
  actions: {
    changePage({commit}, payload) {
      commit('changePage', payload)
    },
    changeLimit({commit}, payload) {
      commit('changeLimit', payload)
    }
  }
});
