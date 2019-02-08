<template>
  <v-list class="pt-0" dense>
    <v-list-tile
      v-for="item in drawerItems"
      :key="item.title"
      @click="
        $emit('closeDrawer');
        $router.push(item.route);
      "
    >
      <v-list-tile-action>
        <v-icon>{{ item.icon }}</v-icon>
      </v-list-tile-action>

      <v-list-tile-content>
        <v-list-tile-title>{{ $t(item.title) }}</v-list-tile-title>
      </v-list-tile-content>
    </v-list-tile>
  </v-list>
</template>
<script>
export default {
  data() {
    return {
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
          route: "/my-measurements"
        }
      ]
    };
  }
};
</script>
