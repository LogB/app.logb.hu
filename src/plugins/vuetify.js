import Vue from "vue";
import i18n from "../i18n";
import Vuetify from "vuetify/lib";
import "vuetify/src/stylus/app.styl";

Vue.use(Vuetify, {
  lang: {
    t: (key, ...params) => i18n.t(key, params)
  },
  theme: {
    primary: "#4895CB",
    accent: "#7EC5FE"
  },
  iconfont: "md"
});
