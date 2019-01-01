<template>
  <v-app>
    <v-navigation-drawer v-model="drawer" absolute temporary :width="drawerWidth" style="height: auto">
      <v-list class="pa-0 mb-1 mt-1" v-if="loggedIn">
        <v-list-tile avatar>
          <v-list-tile-avatar>
            <userIcon :name="username"/>
          </v-list-tile-avatar>

          <v-list-tile-content>
            <v-list-tile-title>{{username}}</v-list-tile-title>
            <v-list-tile-sub-title>{{email}}</v-list-tile-sub-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
      <v-list class="pa-0 mb-1 mt-1" v-else-if="isOnline">
        <v-list-tile avatar>
          <v-list-tile-avatar>
            <v-icon x-large>account_circle</v-icon>
          </v-list-tile-avatar>
          <v-layout row align-center>
            <v-btn outline color="primary">{{ $t('logIn') }}</v-btn>
            <v-btn outline>{{ $t('register') }}</v-btn>
          </v-layout>
        </v-list-tile>
      </v-list>
      <v-list class="pa-0 mb-1 mt-1" v-else>
        <v-list-tile avatar>
          <v-list-tile-avatar>
            <v-icon x-large>sync_disabled</v-icon>
          </v-list-tile-avatar>
          <v-layout row align-center>
            <v-btn outline color="primary" disabled>{{ $t('logIn') }}</v-btn>
            <v-btn outline disabled>{{ $t('register') }}</v-btn>
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
        <v-btn slot="activator" flat>{{activeLocale}}</v-btn>
        <v-list>
          <v-list-tile
            v-for="lang in locales"
            :key="lang"
            @click="changeLocale(lang)"
          >
            <v-list-tile-title>{{lang}}</v-list-tile-title>
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
import userIcon from "./components/Jdenticon.vue";
export default {
  name: "App",
  data() {
    return {
      drawer: null,
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
      locales: ["en", "hu"]
    };
  },
  components: {
    userIcon
  },
  computed: {
    loggedIn() {
      return this.$store.state.loggedIn;
    },
    username() {
      return this.$store.state.user.username;
    },
    email() {
      return this.$store.state.user.email;
    },
    activeLocale() {
      return this.$i18n.locale;
    },
    drawerWidth() {
      switch (this.$i18n.locale) {
        case "hu":
          return 373;
        default:
          return 300;
      }
    }
  },
  methods: {
    changeLocale: function(lang) {
      this.$offlineStorage.set("lang", lang);
      this.$i18n.locale = this.$offlineStorage.get("lang");
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
