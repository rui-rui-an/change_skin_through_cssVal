import Vue from "vue";
import Vuex from "vuex";
// import createPersistedState from 'vuex-persistedstate'
Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    theme: localStorage.getItem('theme') === 'light' ? 'light' : 'dark'
  },
  mutations: {
    setTheme (state, data) {
      state.theme = data
    }
  },
  actions: {},
  modules: {},
  // plugins: [
  //   createPersistedState({
  //     storage: window.localStorage,
  //     reducer (val) {
  //       // console.log(val);
  //       return val
  //     }
  //   })]
});
