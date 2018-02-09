import Vue from 'vue';
import Vuex from 'vuex';
import createPersistedState from 'vuex-persistedstate'

Vue.use(Vuex);

export const store = new Vuex.Store({
  plugins: [createPersistedState()],
  state: {
    currentPage: 1,
    currentLimit: 1,
    showModal: false
  },
  getters: {
  },
  mutations: {
    changePage: function(state, payload) {
      state.currentPage = payload;
    },
    changeLimit: function(state, payload) {
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
