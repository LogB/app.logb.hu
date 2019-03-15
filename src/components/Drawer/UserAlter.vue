<template>
  <v-list-tile avatar>
    <v-list-tile-avatar>
      <userIcon v-if="loggedIn && isOnline" />
      <v-icon
        v-if="!loggedIn && isOnline"
        x-large
      >
        account_circle
      </v-icon>
      <v-icon
        v-if="isOffline"
        x-large
      >
        sync_disabled
      </v-icon>
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
        <v-btn
          slot="activator"
          icon
          ripple
          @click="logout()"
        >
          <v-icon>power_settings_new</v-icon>
        </v-btn>
        <span>{{ $t("logOut") }}</span>
      </v-tooltip>
    </v-list-tile-action>
    <v-slide-x-reverse-transition
      mode="in-out"
      hide-on-leave
    >
      <v-layout
        v-if="!loggedIn && isOnline"
        row
        align-center
      >
        <v-dialog
          v-model="loginMenu"
          fullscreen
          hide-overlay
          transition="dialog-bottom-transition"
        >
          <v-btn
            slot="activator"
            outline
            :color="darkAccent"
          >
            {{ $t("logIn") }}
          </v-btn>
          <v-card>
            <v-card-title class="headline lighten-2">
              {{ $t("logIn") }}
              <v-spacer />
              <v-btn
                icon
                @click="loginMenu = false"
              >
                <v-icon medium>
                  close
                </v-icon>
              </v-btn>
            </v-card-title>
            <v-divider />
            <v-alert
              v-model="errorOccured"
              transition="slide-y-transition"
              outlined
              dismissible
              type="error"
              class="elevation-5"
            >
              {{ $t("dialog.badHappened") }}
            </v-alert>
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
              >
                {{ $t("register") }}
              </v-btn>
            </v-alert>
            <v-form>
              <div
                class="center logb_type select_none"
                style="font-size: 400%"
              >
                LogB
              </div>
              <v-container>
                <v-text-field
                  v-model.trim="loginUsername"
                  counter="15"
                  :error-messages="loginUsernameError"
                  :label="$t('username')"
                  autocomplete="username"
                  required
                  @input="$v.loginUsername.$touch()"
                  @blur="$v.loginUsername.$touch()"
                  @keyup.enter="login(loginUsername, loginPassword)"
                />
                <v-text-field
                  v-model.trim="loginPassword"
                  :append-icon="showPasswords ? 'visibility_off' : 'visibility'"
                  :error-messages="loginPasswordError"
                  :label="$t('password')"
                  autocomplete="current-password"
                  :type="showPasswords ? 'text' : 'password'"
                  required
                  @click:append="showPasswords = !showPasswords"
                  @input="$v.loginPassword.$touch()"
                  @blur="$v.loginPassword.$touch()"
                  @keyup.enter="login(loginUsername, loginPassword)"
                />
              </v-container>
            </v-form>
            <v-divider />
            <v-card-actions>
              <v-spacer />
              <div
                v-if="this.$v.logInCheck.$invalid"
                class="pr-1"
              >
                {{ $t("fillItBeforeSubmit") }}
              </div>
              <v-btn
                color="primary"
                :loading="loading"
                outline
                :disabled="this.$v.logInCheck.$invalid"
                @click="login(loginUsername, loginPassword)"
              >
                {{ $t("logIn") }}
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
        <v-dialog
          v-model="registerMenu"
          fullscreen
          hide-overlay
          transition="dialog-bottom-transition"
        >
          <v-btn
            slot="activator"
            outline
            disabled
          >
            {{ $t("register") }}
          </v-btn>
          <v-card>
            <v-card-title class="headline lighten-2">
              {{ $t("register") }}
              <v-spacer />
              <v-btn
                icon
                @click="registerMenu = false"
              >
                <v-icon medium>
                  close
                </v-icon>
              </v-btn>
            </v-card-title>
            <v-divider />
            <v-form>
              <div
                class="center logb_type select_none"
                style="font-size: 400%"
              >
                LogB
              </div>
              <v-alert
                type="info"
                :value="true"
              >
                Regisztrálni lehet, de jelenleg fejlesztés alatt van a rendszer, így nincs értelme.
              </v-alert>
              <v-container>
                <v-text-field
                  v-model.trim="registerEmail"
                  :error-messages="registerEmailError"
                  :label="$t('email')"
                  autocomplete="email"
                  required
                  @input="$v.registerEmail.$touch()"
                  @blur="$v.registerEmail.$touch()"
                  @keyup.enter="register(registerUsername, registerPassword, registerEmail)"
                />
                <v-text-field
                  v-model.trim="registerUsername"
                  counter="15"
                  :error-messages="registerUsernameError"
                  :label="$t('username')"
                  autocomplete="username"
                  required
                  @input="$v.registerUsername.$touch()"
                  @blur="$v.registerUsername.$touch()"
                  @keyup.enter="register(registerUsername, registerPassword, registerEmail)"
                />
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
                  @keyup.enter="register(registerUsername, registerPassword, registerEmail)"
                />
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
                  @keyup.enter="register(registerUsername, registerPassword, registerEmail)"
                />
              </v-container>
            </v-form>
            <v-divider />
            <v-card-actions>
              <v-spacer />
              <div
                v-if="this.$v.registerCheck.$invalid"
                class="pr-1"
              >
                {{ $t("fillItBeforeSubmit") }}
              </div>
              <v-btn
                color="primary"
                :loading="loading"
                outline
                :disabled="this.$v.registerCheck.$invalid"
                @click="register(registerUsername, registerPassword, registerEmail)"
              >
                {{ $t("register") }}
              </v-btn>
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
                  @click="
                    loginUsername = registerUsername;
                    loginPassword = registerPassword;
                    login(registerUsername, registerPassword);
                  "
                >
                  {{ $t("dialog.yes") }}
                </v-btn>
                <v-btn
                  flat
                  color="white"
                  @click="
                    loginAfterReg = false;
                    registerMenu = false;
                  "
                >
                  {{ $t("dialog.no") }}
                </v-btn>
              </v-alert>
              <v-alert
                v-model="errorOccured"
                transition="slide-y-transition"
                outlined
                dismissible
                type="error"
                class="elevation-5"
              >
                {{ $t("dialog.badHappened") }}
              </v-alert>
            </v-container>
          </v-card>
        </v-dialog>
      </v-layout>
    </v-slide-x-reverse-transition>
  </v-list-tile>
</template>
<script>
import { mapState, mapMutations } from "vuex";
import api from "@/api";
import {
  required,
  maxLength,
  minLength,
  email,
  sameAs
} from "vuelidate/lib/validators";
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
      loginUsername: "",
      loginPassword: "",
      registerUsername: "",
      registerEmail: "",
      registerPassword: "",
      registerPasswordAgain: "",
      loading: false,
      showPasswords: false,
      userMinLength: 2,
      userMaxLength: 15,
      passMinLength: 5
    };
  },
  validations: {
    loginUsername: {
      required,
      minLength: minLength(2),
      maxLength: maxLength(15)
    },
    loginPassword: {
      required,
      minLength: minLength(5),
      maxLength: maxLength(50)
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
    logInCheck: ["loginUsername", "loginPassword"],
    registerCheck: [
      "registerUsername",
      "registerEmail",
      "registerPassword",
      "registerPasswordAgain"
    ]
  },
  computed: {
    loginUsernameError() {
      const errors = [];
      if (!this.$v.loginUsername.$dirty) return errors;
      !this.$v.loginUsername.required &&
        errors.push(this.$t("form.cantBeEmpty"));
      !this.$v.loginUsername.minLength &&
        errors.push(this.$t("form.moreThan", { n: this.userMinLength }));
      !this.$v.loginUsername.maxLength &&
        errors.push(this.$t("form.lessThan", { n: this.userMaxLength }));
      return errors;
    },
    loginPasswordError() {
      const errors = [];
      if (!this.$v.loginPassword.$dirty) return errors;
      !this.$v.loginPassword.required &&
        errors.push(this.$t("form.cantBeEmpty"));
      !this.$v.loginPassword.minLength &&
        errors.push(this.$t("form.moreThan", { n: this.passMinLength }));
      !this.$v.loginPassword.maxLength && errors.push(":D >50?");
      return errors;
    },
    registerUsernameError() {
      const errors = [];
      if (!this.$v.registerUsername.$dirty) return errors;
      !this.$v.registerUsername.required &&
        errors.push(this.$t("form.cantBeEmpty"));
      !this.$v.registerUsername.minLength &&
        errors.push(this.$t("form.moreThan", { n: this.userMinLength }));
      !this.$v.registerUsername.maxLength &&
        errors.push(this.$t("form.lessThan", { n: this.userMaxLength }));
      !this.$v.registerUsername.isUnique &&
        errors.push(this.$t("form.alreadyTaken"));
      return errors;
    },
    registerEmailError() {
      const errors = [];
      if (!this.$v.registerEmail.$dirty) return errors;
      !this.$v.registerEmail.required &&
        errors.push(this.$t("form.cantBeEmpty"));
      !this.$v.registerEmail.email && errors.push(this.$t("form.notLikeEmail"));
      return errors;
    },
    registerPasswordError() {
      const errors = [];
      if (!this.$v.registerPassword.$dirty) return errors;
      !this.$v.registerPassword.required &&
        errors.push(this.$t("form.cantBeEmpty"));
      !this.$v.registerPassword.minLength &&
        errors.push(this.$t("form.moreThan", { n: this.passMinLength }));
      return errors;
    },
    registerPasswordAgainError() {
      const errors = [];
      if (!this.$v.registerPasswordAgain.$dirty) return errors;
      !this.$v.registerPasswordAgain.sameAs &&
        errors.push(this.$t("form.passNotEqual"));
      return errors;
    },
    darkAccent() {
      if (this.$store.state.dark) return "accent";
      return "primary";
    },
    ...mapState({
      user: state => state.user,
      loggedIn: state => state.loggedIn
    })
  },
  methods: {
    ...mapMutations(["LOG_IN", "LOG_OUT"]),
    login(un, pw) {
      if (!this.$v.logInCheck.$invalid) {
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
              this.registerMenu = false;
              this.loginAfterReg = false;
              this.loading = false;
            } else {
              if (data.data.error == 13) this.badCredentials = true;
              this.loading = false;
            }
            // success here
          })
          .catch(() => {
            this.errorOccured = true;
            this.loading = false;
          });
        // bad there
      }
    },
    register(un, pw, email) {
      if (!this.$v.registerCheck.$invalid) {
        this.loading = true;
        this.errorOccured = false;
        api
          .register(un, pw, email)
          .then(() => {
            this.loading = false;
            this.loginAfterReg = true;
          })
          .catch(() => {
            this.errorOccured = true;
            this.loading = false;
          });
      }
    },
    logout() {
      api.logout().then(this.LOG_OUT());
    }
  }
};
</script>
