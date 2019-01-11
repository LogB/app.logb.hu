import Vue from "vue";
import Vuex from "vuex";
import VuexPersist from "vuex-persist";
import localforage from "localforage";

Vue.use(Vuex);

const vuexPersist = new VuexPersist({
  storage: localforage
});

export default new Vuex.Store({
  state: {
    // color: "#4895CB",
    loggedIn: true,
    locale: navigator.language.substr(0, 2),
    user: {
      username: "Remenyo",
      email: "remenyo@logb.com"
    }
  },
  mutations: {
    CHANGE_LOCALE(state, locale) {
      state.locale = locale;
    }
  },
  actions: {},
  plugins: [vuexPersist.plugin]
});
