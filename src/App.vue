<template>
  <v-app :dark="dark">
    <v-navigation-drawer v-model="drawer" temporary app :width="drawerWidth">
      <v-list dense class="pa-0 mb-1 mt-1">
        <LoginReg/>
        <v-divider/>
        <DrawerItems/>
        <v-divider/>
        <v-list-tile href="https://logb.hu/about">
          <v-list-tile-action>
            <v-icon>info</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>
              {{ $t("whatIsLogB") }}
              <v-icon small>open_in_new</v-icon>
            </v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
        <v-divider/>
        <v-layout row align-center>
          <LocaleChanger/>
          <DarkMode/>
        </v-layout>
      </v-list>
      <v-divider/>
      <v-layout class="pa-0" justify-center>
        <v-footer color="transparent">
          <span class="mt-1 center">
            v0.17
            <br>2019 -
            <span class="logb_type">
              LogB
              <sup>&copy;</sup>
            </span>
          </span>
        </v-footer>
      </v-layout>
    </v-navigation-drawer>
    <v-toolbar app scroll-off-screen :color="darkOrPrimary" dark>
      <v-toolbar-side-icon @click.stop="drawer = !drawer"/>
      <v-toolbar-title>
        <span
          class="logb_type select_none"
          style="cursor: pointer; font-size: 110%"
          @click="$router.push('/')"
        >LogB</span>
      </v-toolbar-title>
    </v-toolbar>
    <v-content>
      <v-container fluid fill-height>
        <router-view/>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
import LoginReg from "./components/Drawer/UserAlter.vue";
import DarkMode from "./components/Drawer/DarkModeSwitch.vue";
import DrawerItems from "./components/Drawer/DrawerItems.vue";
import LocaleChanger from "./components/Drawer/LocaleChanger.vue";

export default {
  name: "App",
  components: {
    LoginReg,
    DrawerItems,
    LocaleChanger,
    DarkMode
  },
  data() {
    return {
      drawer: false
    };
  },
  computed: {
    drawerWidth() {
      switch (this.$i18n.locale) {
        case "hu":
          return 332;
        default:
          return 296;
      }
    },
    dark() {
      return this.$store.state.dark;
    },
    darkOrPrimary() {
      if (this.$store.state.dark) return;
      return "primary";
    }
  }
};
</script>
<style>
@import url(./assets/common.css);
</style>
