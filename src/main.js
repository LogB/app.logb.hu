import Vue from "vue";
import "./plugins/vuetify";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "./registerServiceWorker";
import "roboto-fontface/css/roboto/roboto-fontface.css";
import "material-design-icons-iconfont/dist/material-design-icons.css";
import i18n from "./i18n";
import VueOffline from "vue-offline";
Vue.config.productionTip = false;
Vue.use(VueOffline);
var vm = new Vue({
  router,
  store,
  i18n,
  render: h => h(App)
}).$mount("#app");
if (vm.$offlineStorage.get("lang") == null) {
  vm.$offlineStorage.set("lang", navigator.language.substr(0, 2));
} else {
  vm.$i18n.locale = vm.$offlineStorage.get("lang");
}
if (module.hot) {
  module.hot.accept(["./locales/en.json", "./locales/hu.json"], function() {
    i18n.setLocaleMessage("en", require("./locales/en.json").default);
    i18n.setLocaleMessage("hu", require("./locales/hu.json").default);
    // Or the following hot updates via $i18n property
    // app.$i18n.setLocaleMessage('en', require('./en').default)
    // app.$i18n.setLocaleMessage('ja', require('./ja').default)
  });
}
