<template>
  <v-app :dark="dark">
    <v-navigation-drawer
      ref="drawer"
      v-model="drawer"
      app
      scroll-threshold="300"
      card
      :width="drawerWidth"
    >
      <v-list class="pa-0 mb-1 mt-1">
        <LoginReg/>
      </v-list>
      <v-divider></v-divider>
      <DrawerItems/>
      <v-divider></v-divider>
      <v-layout row align-center>
        <LocaleChanger/>
        <DarkMode/>
      </v-layout>
      <v-divider></v-divider>
      <v-layout class="pa-0" justify-center>
        <v-footer color="transparent">
          2019 -&nbsp;
          <strong class="logb_type">
            LogB
            <sup>&copy;</sup>
          </strong>
        </v-footer>
      </v-layout>
    </v-navigation-drawer>
    <v-toolbar app scroll-off-screen :color="darkOrPrimary" dark>
      <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
      <v-toolbar-title>
        <span class="logb_type select_none" style="cursor: pointer" @click="$router.push('/')">
          LogB Cloud
          <sup>Alpha</sup>
        </span>
      </v-toolbar-title>
    </v-toolbar>
    <v-content>
      <v-container fill-height>
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
          return 373;
        default:
          return 300;
      }
    },
    dark() {
      return this.$store.state.dark;
    },
    darkOrPrimary() {
      if (this.$store.state.dark) return;
      else return "primary";
    }
  }
};
</script>
<style>
@import url(./assets/common.css);
</style>
