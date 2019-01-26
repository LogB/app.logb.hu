<template>
  <v-app>
    <v-navigation-drawer
      v-model="drawer"
      app
      absolute
      temporary
      :width="drawerWidth"
      style="height: auto;"
    >
      <LoginReg/>
      <v-divider></v-divider>
      <DrawerItems/>
      <v-divider></v-divider>
      <LocaleChanger/>
      <v-divider></v-divider>
      <v-list class="pa-0">
        <v-footer color="transparent">
          <v-layout justify-center>
            2019 -&nbsp;
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
import LoginReg from "./components/Drawer/UserAlter.vue";
import DrawerItems from "./components/Drawer/DrawerItems.vue";
import LocaleChanger from "./components/Drawer/LocaleChanger.vue";
export default {
  name: "App",
  components: {
    LoginReg,
    DrawerItems,
    LocaleChanger
  },
  data() {
    return {
      drawer: null
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
