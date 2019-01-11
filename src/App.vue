<template>
  <v-app>
    <v-navigation-drawer
      v-model="drawer"
      absolute
      temporary
      :width="drawerWidth"
      style="height: auto"
    >
      <v-list class="pa-0 mb-1 mt-1">
        <v-list-tile avatar>
          <v-list-tile-avatar>
            <userIcon v-if="loggedIn&&isOnline"/>
            <v-icon v-if="!loggedIn&&isOnline" x-large>account_circle</v-icon>
            <v-icon v-if="isOffline" x-large>sync_disabled</v-icon>
          </v-list-tile-avatar>
          <v-list-tile-content v-if="loggedIn&&isOnline">
            <v-list-tile-title>{{user.username}}</v-list-tile-title>
            <v-list-tile-sub-title>{{user.email}}</v-list-tile-sub-title>
          </v-list-tile-content>
          <v-list-tile-content v-if="isOffline">
            <v-list-tile-title>{{$t('offline')}}</v-list-tile-title>
            <v-list-tile-sub-title>{{$t('noInternet')}}</v-list-tile-sub-title>
          </v-list-tile-content>
          <v-layout v-if="!loggedIn&&isOnline" row align-center>
            <v-menu v-model="loginMenu" offset-y :nudge-width="240" :close-on-content-click="false">
              <v-btn slot="activator" outline color="primary">{{ $t('logIn') }}</v-btn>
              <v-card>
                <v-card-title class="headline lighten-2">{{ $t('logIn') }}</v-card-title>
                <v-divider></v-divider>
                <v-form>
                  <v-container>
                    <v-text-field
                      v-model="logInUsername"
                      counter="15"
                      :error-messages="logInUsernameError"
                      :label="$t('username')"
                      required
                      @input="$v.logInUsername.$touch()"
                      @blur="$v.logInUsername.$touch()"
                    ></v-text-field>
                    <v-text-field
                      v-model="logInPassword"
                      :error-messages="logInPasswordError"
                      :label="$t('password')"
                      required
                      @input="$v.logInPassword.$touch()"
                      @blur="$v.logInPassword.$touch()"
                    ></v-text-field>
                  </v-container>
                </v-form>
                <v-divider></v-divider>
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn color="primary" flat @click="loginMenu = false">{{ $t('logIn') }}</v-btn>
                </v-card-actions>
              </v-card>
            </v-menu>
            <v-menu
              v-model="registerMenu"
              offset-y
              :nudge-width="230"
              :close-on-content-click="false"
            >
              <v-btn slot="activator" outline>{{ $t('register') }}</v-btn>
              <v-card>
                <v-card-title class="headline lighten-2">{{ $t('register') }}</v-card-title>
                <v-divider></v-divider>
                <v-form>
                  <v-container>
                    <v-text-field
                      v-model="registerEmail"
                      :error-messages="registerEmailError"
                      :label="$t('email')"
                      required
                      @input="$v.registerEmail.$touch()"
                      @blur="$v.registerEmail.$touch()"
                    ></v-text-field>
                    <v-text-field
                      v-model="registerUsername"
                      counter="15"
                      :error-messages="registerUsernameError"
                      :label="$t('username')"
                      required
                      @input="$v.registerUsername.$touch()"
                      @blur="$v.registerUsername.$touch()"
                    ></v-text-field>
                    <v-text-field
                      v-model="registerPassword"
                      :error-messages="registerPasswordError"
                      :label="$t('password')"
                      required
                      @input="$v.registerPassword.$touch()"
                      @blur="$v.registerPassword.$touch()"
                    ></v-text-field>
                    <v-text-field
                      v-model="registerPasswordAgain"
                      :error-messages="registerPasswordAgainError"
                      :label="$t('passwordAgain')"
                      required
                      @input="$v.registerPasswordAgain.$touch()"
                      @blur="$v.registerPasswordAgain.$touch()"
                    ></v-text-field>
                  </v-container>
                </v-form>
                <v-divider></v-divider>
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn color="primary" flat @click="registerMenu = false">{{ $t('register') }}</v-btn>
                </v-card-actions>
              </v-card>
            </v-menu>
          </v-layout>
        </v-list-tile>
      </v-list>
      <v-divider></v-divider>
      <v-list class="pt-0" dense>
        <v-list-tile
          v-for="item in drawerItems"
          :key="item.title"
          @click="$router.push(item.route)"
        >
          <v-list-tile-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-tile-action>

          <v-list-tile-content>
            <v-list-tile-title>{{$t(item.title)}}</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
      <v-divider></v-divider>
      <v-menu offset-y>
        <v-btn slot="activator" flat>{{$t('language')}}: {{activeLocale}}</v-btn>
        <v-list>
          <v-list-tile v-for="lang in locales" :key="lang" @click="changeLocale(lang)">
            <v-list-tile-title>{{lang|upperCase}}</v-list-tile-title>
          </v-list-tile>
        </v-list>
      </v-menu>
      <v-list class="pa-0">
        <v-footer color="transparent">
          <v-layout justify-center>
            2018 -&nbsp;
            <strong class="logb_type">
              LogB
              <sup>&copy;</sup>
            </strong>
          </v-layout>
        </v-footer>
      </v-list>
    </v-navigation-drawer>
    <v-toolbar app>
      <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
      <v-toolbar-title>
        <span class="logb_type">LogB Cloud</span>
      </v-toolbar-title>
    </v-toolbar>

    <v-content>
      <router-view class="app_view"/>
    </v-content>
  </v-app>
</template>

<script>
import {
  required,
  maxLength,
  minLength,
  email,
  sameAs
} from "vuelidate/lib/validators";
import userIcon from "./components/Jdenticon.vue";
import { VueOfflineMixin } from "vue-offline";
import { mapMutations } from "vuex";
import { mapState } from "vuex";
export default {
  name: "App",
  components: {
    userIcon
  },
  mixins: [VueOfflineMixin],
  data() {
    return {
      drawer: null,
      loginMenu: null,
      registerMenu: null,
      drawerItems: [
        {
          icon: "home",
          title: "homePage",
          route: "/"
        },
        {
          icon: "folder_shared",
          title: "sharedMeasurements",
          route: "/shared"
        },
        {
          icon: "cloud_download",
          title: "downloadedMeasurements",
          route: "/downloaded"
        },
        {
          icon: "home",
          title: "myMeasurements",
          route: "/measurements"
        }
      ],
      locales: ["en", "hu"],
      logInUsername: "",
      logInPassword: "",
      registerUsername: "",
      registerEmail: "",
      registerPassword: "",
      registerPasswordAgain: ""
    };
  },
  validations: {
    logInUsername: {
      required,
      minLength: minLength(2),
      maxLength: maxLength(15)
    },
    logInPassword: {
      required,
      minLength: minLength(6)
    },
    registerUsername: {
      required,
      minLength: minLength(2),
      maxLength: maxLength(15)
    },
    registerEmail: {
      required,
      email
    },
    registerPassword: {
      required,
      minLength: minLength(6)
    },
    registerPasswordAgain: {
      sameAs: sameAs("registerPassword")
    }
  },
  computed: {
    drawerWidth() {
      switch (this.$i18n.locale) {
        case "hu":
          return 373;
        default:
          return 300;
      }
    },
    logInUsernameError() {
      const errors = [];
      if (!this.$v.logInUsername.$dirty) return errors;
      !this.$v.logInUsername.required && errors.push(">0");
      !this.$v.logInUsername.minLength && errors.push(">2");
      !this.$v.logInUsername.maxLength && errors.push("<15");
      return errors;
    },
    logInPasswordError() {
      const errors = [];
      if (!this.$v.logInPassword.$dirty) return errors;
      !this.$v.logInPassword.required && errors.push(">0");
      !this.$v.logInPassword.minLength && errors.push(">5");
      return errors;
    },
    registerUsernameError() {
      const errors = [];
      if (!this.$v.registerUsername.$dirty) return errors;
      !this.$v.registerUsername.required && errors.push(">0");
      !this.$v.registerUsername.minLength && errors.push(">2");
      !this.$v.registerUsername.maxLength && errors.push("<15");
      return errors;
    },
    registerEmailError() {
      const errors = [];
      if (!this.$v.registerEmail.$dirty) return errors;
      !this.$v.registerEmail.required && errors.push(">0");
      !this.$v.registerEmail.email && errors.push("Email?");
      return errors;
    },
    registerPasswordError() {
      const errors = [];
      if (!this.$v.registerPassword.$dirty) return errors;
      !this.$v.registerPassword.required && errors.push(">0");
      !this.$v.registerPassword.minLength && errors.push(">5");
      return errors;
    },
    registerPasswordAgainError() {
      const errors = [];
      if (!this.$v.registerPasswordAgain.$dirty) return errors;
      !this.$v.registerPasswordAgain.sameAs && errors.push("=!");
      return errors;
    },
    stateLocale() {
      return this.$store.state.locale;
    },
    ...mapState({
      user: state => state.user,
      loggedIn: state => state.loggedIn
    })
  },
  watch: {
    activeLocale: function() {
      this.$i18n.locale = this.$store.state.locale;
    }
  },
  methods: {
    ...mapMutations(["CHANGE_LOCALE"]),
    changeLocale: function(lang) {
      this.CHANGE_LOCALE(lang);
    }
  }
};
</script>
<style>
@font-face {
  font-family: Arciformi;
  src: url(./assets/Arciformi.woff2);
}
.logb_type {
  font-family: Arciformi, Roboto;
}
.app_view {
  margin: 8px;
}
</style>
