<template>
  <v-list-tile avatar>
    <v-list-tile-avatar>
      <userIcon v-if="loggedIn && isOnline" />
      <v-icon v-if="!loggedIn && isOnline" x-large>account_circle</v-icon>
      <v-icon v-if="isOffline" x-large>sync_disabled</v-icon>
    </v-list-tile-avatar>
    <v-list-tile-content v-if="loggedIn && isOnline">
      <v-list-tile-title>{{ user.name }}</v-list-tile-title>
      <v-list-tile-sub-title>{{ user.email }}</v-list-tile-sub-title>
    </v-list-tile-content>
    <v-list-tile-content v-if="isOffline">
      <v-list-tile-title>{{ $t("offline") }}</v-list-tile-title>
      <v-list-tile-sub-title>{{ $t("noInternet") }}</v-list-tile-sub-title>
    </v-list-tile-content>
    <v-list-tile-action v-if="loggedIn && isOnline">
      <v-tooltip bottom>
        <v-btn slot="activator" icon ripple @click="logout()">
          <v-icon>power_settings_new</v-icon>
        </v-btn>
        <span>{{ $t("logOut") }}</span>
      </v-tooltip>
    </v-list-tile-action>
    <v-slide-x-reverse-transition mode="in-out" hide-on-leave>
      <v-layout v-if="!loggedIn && isOnline" row align-center>
        <v-dialog
          v-model="loginMenu"
          fullscreen
          hide-overlay
          transition="dialog-bottom-transition"
        >
          <v-btn slot="activator" outline :color="darkAccent">{{
            $t("logIn")
          }}</v-btn>
          <v-card>
            <v-card-title class="headline lighten-2">
              {{ $t("logIn") }}
              <v-spacer></v-spacer>
              <v-btn icon @click="loginMenu = false">
                <v-icon medium>close</v-icon>
              </v-btn>
            </v-card-title>
            <v-divider></v-divider>
            <v-alert
              v-model="errorOccured"
              transition="slide-y-transition"
              outlined
              dismissible
              type="error"
              class="elevation-5"
              >{{ $t("dialog.badHappened") }}</v-alert
            >
            <v-alert
              v-model="badCredentials"
              transition="slide-y-transition"
              outlined
              dismissible
              type="warning"
              class="elevation-5"
            >
              {{ $t("dialog.badCredentials") }} {{ $t("dialog.dontHave") }}
              <v-btn
                outline
                @click="
                  badCredentials = false;
                  loginMenu = false;
                  registerMenu = true;
                "
                >{{ $t("register") }}</v-btn
              >
            </v-alert>
            <v-form>
              <v-container>
                <v-text-field
                  v-model.trim="logInUsername"
                  counter="15"
                  :error-messages="logInUsernameError"
                  :label="$t('username')"
                  autocomplete="username"
                  required
                  @input="$v.logInUsername.$touch()"
                  @blur="$v.logInUsername.$touch()"
                ></v-text-field>
                <v-text-field
                  v-model.trim="logInPassword"
                  :append-icon="showPasswords ? 'visibility_off' : 'visibility'"
                  :error-messages="logInPasswordError"
                  :label="$t('password')"
                  autocomplete="current-password"
                  :type="showPasswords ? 'text' : 'password'"
                  required
                  @click:append="showPasswords = !showPasswords"
                  @input="$v.logInPassword.$touch()"
                  @blur="$v.logInPassword.$touch()"
                ></v-text-field>
              </v-container>
            </v-form>
            <v-divider></v-divider>
            <v-card-actions>
              <v-spacer></v-spacer>
              <div v-if="this.$v.logInCheck.$invalid" class="pr-1">
                {{ $t("fillItBeforeSubmit") }}
              </div>
              <v-btn
                color="primary"
                :loading="loading"
                outline
                :disabled="this.$v.logInCheck.$invalid"
                @click="login(logInUsername, logInPassword)"
                >{{ $t("logIn") }}</v-btn
              >
            </v-card-actions>
          </v-card>
        </v-dialog>
        <v-dialog
          v-model="registerMenu"
          fullscreen
          hide-overlay
          transition="dialog-bottom-transition"
        >
          <v-btn slot="activator" outline>{{ $t("register") }}</v-btn>
          <v-card>
            <v-card-title class="headline lighten-2">
              {{ $t("register") }}
              <v-spacer></v-spacer>
              <v-btn icon @click="registerMenu = false">
                <v-icon medium>close</v-icon>
              </v-btn>
            </v-card-title>
            <v-divider></v-divider>
            <v-form>
              <v-container>
                <v-text-field
                  v-model.trim="registerEmail"
                  :error-messages="registerEmailError"
                  :label="$t('email')"
                  autocomplete="email"
                  required
                  @input="$v.registerEmail.$touch()"
                  @blur="$v.registerEmail.$touch()"
                ></v-text-field>
                <v-text-field
                  v-model.trim="registerUsername"
                  counter="15"
                  :error-messages="registerUsernameError"
                  :label="$t('username')"
                  autocomplete="username"
                  required
                  @input="$v.registerUsername.$touch()"
                  @blur="$v.registerUsername.$touch()"
                ></v-text-field>
                <v-text-field
                  v-model.trim="registerPassword"
                  :append-icon="showPasswords ? 'visibility_off' : 'visibility'"
                  :error-messages="registerPasswordError"
                  :label="$t('password')"
                  autocomplete="new-password"
                  :type="showPasswords ? 'text' : 'password'"
                  required
                  @click:append="showPasswords = !showPasswords"
                  @input="$v.registerPassword.$touch()"
                  @blur="$v.registerPassword.$touch()"
                ></v-text-field>
                <v-text-field
                  v-model.trim="registerPasswordAgain"
                  :append-icon="showPasswords ? 'visibility_off' : 'visibility'"
                  :error-messages="registerPasswordAgainError"
                  :label="$t('passwordAgain')"
                  autocomplete="new-password"
                  :type="showPasswords ? 'text' : 'password'"
                  required
                  @click:append="showPasswords = !showPasswords"
                  @input="$v.registerPasswordAgain.$touch()"
                  @blur="$v.registerPasswordAgain.$touch()"
                ></v-text-field>
              </v-container>
            </v-form>
            <v-divider></v-divider>
            <v-card-actions>
              <v-spacer></v-spacer>
              <div v-if="this.$v.registerCheck.$invalid" class="pr-1">
                {{ $t("fillItBeforeSubmit") }}
              </div>
              <v-btn
                color="primary"
                :loading="loading"
                outline
                :disabled="this.$v.registerCheck.$invalid"
                @click="
                  register(registerUsername, registerPassword, registerEmail)
                "
                >{{ $t("register") }}</v-btn
              >
            </v-card-actions>
            <v-container>
              <v-alert
                v-model="loginAfterReg"
                transition="slide-y-transition"
                outlined
                type="success"
                color="success"
                class="elevation-5"
              >
                {{ $t("dialog.alsoLogin") }}
                <v-btn
                  :loading="loading"
                  outline
                  color="white"
                  @click="login(registerUsername, registerPassword)"
                  >{{ $t("dialog.yes") }}</v-btn
                >
                <v-btn
                  flat
                  color="white"
                  @click="
                    loginAfterReg = false;
                    registerMenu = false;
                  "
                  >{{ $t("dialog.no") }}</v-btn
                >
              </v-alert>
              <v-alert
                v-model="errorOccured"
                transition="slide-y-transition"
                outlined
                dismissible
                type="error"
                class="elevation-5"
                >{{ $t("dialog.badHappened") }}</v-alert
              >
            </v-container>
          </v-card>
        </v-dialog>
      </v-layout>
    </v-slide-x-reverse-transition>
  </v-list-tile>
</template>
<script>
import { mapMutations } from "vuex";
import api from "@/api.js";
import {
  required,
  maxLength,
  minLength,
  email,
  sameAs
} from "vuelidate/lib/validators";
import { mapState } from "vuex";
import { VueOfflineMixin } from "vue-offline";
import userIcon from "../Jdenticon.vue";
export default {
  components: {
    userIcon
  },
  mixins: [VueOfflineMixin],
  data() {
    return {
      badCredentials: null,
      errorOccured: null,
      loginAfterReg: null,
      loginMenu: null,
      registerMenu: null,
      logInUsername: "",
      logInPassword: "",
      registerUsername: "",
      registerEmail: "",
      registerPassword: "",
      registerPasswordAgain: "",
      loading: false,
      showPasswords: false
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
      minLength: minLength(5)
    },
    registerUsername: {
      required,
      minLength: minLength(2),
      maxLength: maxLength(15),
      isUnique: async value => {
        if (value === "") return true;
        const data = await api.isUnique(value);
        return data.data;
      }
    },
    registerEmail: {
      required,
      email
    },
    registerPassword: {
      required,
      minLength: minLength(5)
    },
    registerPasswordAgain: {
      sameAs: sameAs("registerPassword")
    },
    logInCheck: ["logInUsername", "logInPassword"],
    registerCheck: [
      "registerUsername",
      "registerEmail",
      "registerPassword",
      "registerPasswordAgain"
    ]
  },
  computed: {
    logInUsernameError() {
      const errors = [];
      if (!this.$v.logInUsername.$dirty) return errors;
      !this.$v.logInUsername.required && errors.push(this.$t("cantBeEmpty"));
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
      !this.$v.registerUsername.isUnique && errors.push("vanmárilyen");
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
    darkAccent() {
      if (this.$store.state.dark) return "accent";
      else return "primary";
    },
    ...mapState({
      user: state => state.user,
      loggedIn: state => state.loggedIn
    })
  },
  methods: {
    ...mapMutations(["LOG_IN", "LOG_OUT"]),
    login(un, pw) {
      this.loading = true;
      this.errorOccured = false;
      api
        .login(un, pw)
        .then(data => {
          if (data.data.error == 20) {
            api.viewUserMeta().then(data => {
              this.LOG_IN({
                username: data.data.username,
                email: data.data.email
              });
            });
            this.loginMenu = false;
            this.loginAfterReg = false;
            this.loading = false;
          } else {
            if (data.data.error == 13) this.badCredentials = true;
            this.loading = false;
          }
          //success here
        })
        .catch(function() {
          this.errorOccured = true;
          this.loading = false;
        });
      //bad there
    },
    register(un, pw, email) {
      this.loading = true;
      this.errorOccured = false;
      api
        .register(un, pw, email)
        .then(function() {
          this.loading = false;
          this.loginAfterReg = true;
        })
        .catch(function() {
          this.errorOccured = true;
          this.loading = false;
        });
    },
    logout() {
      api.logout().then(this.LOG_OUT());
    }
  }
};
</script>
