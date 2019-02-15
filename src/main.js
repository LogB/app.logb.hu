import Vue from "vue";
import "roboto-fontface/css/roboto/roboto-fontface.css";
import "material-design-icons-iconfont/dist/material-design-icons.css";
import "./plugins/vuetify";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "./registerServiceWorker";
import i18n from "./i18n";
import Vuelidate from "vuelidate";
import axios from "axios";
import VueAxios from "vue-axios";
import Clipboard from "v-clipboard";
//import SmoothScrollbar from 'vue-smooth-scrollbar'
//Vue.use(SmoothScrollbar);
axios.defaults.baseURL = "https://cloud.logb.hu/cloud";
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
