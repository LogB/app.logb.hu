import Vue from "vue";
import "./plugins/vuetify";
import axios from "axios";
import Vuelidate from "vuelidate";
import VueAxios from "vue-axios";
import Clipboard from "v-clipboard";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "./registerServiceWorker";
import i18n from "./i18n";

import(/* webpackPreload: true */ "roboto-fontface/css/roboto/roboto-fontface.css");
import(/* webpackPreload: true */ "material-design-icons-iconfont/dist/material-design-icons.css");
// import SmoothScrollbar from 'vue-smooth-scrollbar'
// Vue.use(SmoothScrollbar);
axios.defaults.baseURL = "https://api.logb.hu/v1.1/";
Vue.config.productionTip = false;
Vue.use(VueAxios, axios);
Vue.use(Vuelidate);
Vue.use(Clipboard);
new Vue({
  router,
  store,
  i18n,
  render: h => h(App)
}).$mount("#app");
