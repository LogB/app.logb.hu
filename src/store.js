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
    dark: false,
    loggedIn: false,
    locale: navigator.language.substr(0, 2),
    user: {
      name: "",
      email: ""
    },
    loggingOrSigning: false
  },
  mutations: {
    CHANGE_LOCALE(state, locale) {
      state.locale = locale;
    },
    LOG_IN(state, payload) {
      state.loggedIn = true;
      state.user.name = payload.username;
      state.user.email = payload.email;
    },
    LOG_OUT(state) {
      state.loggedIn = false;
      state.user.name = null;
      state.user.email = null;
    },
    DRAWER(state, payload) {
      state.drawer = payload;
    },
    CHANGE_DARK(state, payload) {
      state.dark = payload;
    }
  },
  getters: {},
  actions: {},
  plugins: [vuexPersist.plugin]
});
