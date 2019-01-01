import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    loggedIn: false,
    online: true,
    user: {
      username: "Remenyo",
      email: "remenyo@gmail.com"
    }
  },
  mutations: {},
  actions: {}
});
