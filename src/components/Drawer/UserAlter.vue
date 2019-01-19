<template>
  <v-list ref="loginWidth" class="pa-0 mb-1 mt-1">
    <v-list-tile avatar>
      <v-list-tile-avatar>
        <userIcon v-if="loggedIn&&isOnline"/>
        <v-icon v-if="!loggedIn&&isOnline" x-large>account_circle</v-icon>
        <v-icon v-if="isOffline" x-large>sync_disabled</v-icon>
      </v-list-tile-avatar>
      <v-list-tile-content v-if="loggedIn&&isOnline">
        <v-list-tile-title>{{user.name}}</v-list-tile-title>
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
              <div
                v-if="this.$v.logInCheck.$invalid&&this.$v.logInCheck.$anyDirty"
                class="pr-1"
              >{{ $t('fillItBeforeSubmit') }}</div>
              <v-btn
                color="primary"
                :loading="loading"
                outline
                :disabled="this.$v.logInCheck.$invalid&&this.$v.logInCheck.$anyDirty"
                @click="login()"
              >{{ $t('logIn') }}</v-btn>
            </v-card-actions>
          </v-card>
        </v-menu>
        <v-menu v-model="registerMenu" offset-y :nudge-width="230" :close-on-content-click="false">
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
              <div
                v-if="this.$v.registerCheck.$invalid&&this.$v.registerCheck.$anyDirty"
                class="pr-1"
              >{{ $t('fillItBeforeSubmit') }}</div>
              <v-btn
                color="primary"
                :loading="loading"
                outline
                :disabled="this.$v.registerCheck.$invalid&&this.$v.registerCheck.$anyDirty"
                @click="register()"
              >{{ $t('register') }}</v-btn>
            </v-card-actions>
          </v-card>
        </v-menu>
      </v-layout>
    </v-list-tile>
  </v-list>
</template>
<script>
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
      loginMenu: null,
      registerMenu: null,
      logInUsername: "",
      logInPassword: "",
      registerUsername: "",
      registerEmail: "",
      registerPassword: "",
      registerPasswordAgain: "",
      loading: false
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
      minLength: minLength(2)
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
    ...mapState({
      user: state => state.user,
      loggedIn: state => state.loggedIn
    })
  },
  updated() {
    this.$emit("updateDrawerWidth");
  },
  methods: {
    login: function() {
      this.loading = true;
      this.axios
        .post(
          "/",
          "function=WLI&un=" + this.logInUsername + "&pw=" + this.logInPassword
        )
        .then(response => {
          this.loading = false;
          return console.log(response);
        })
        .catch(error => console.log(error));
    },
    register: function() {
      //this.api.login(this.logInUsername, this.logInPassword);
      //console.log(this.$v.registerCheck.$invalid);
    }
  }
};
</script>
