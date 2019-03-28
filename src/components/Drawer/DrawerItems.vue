<template>
  <div>
    <v-list-tile
      v-for="item in $options.drawerItems"
      :key="item.title"
      :disabled="isOffline&&item.onlineOnly"
      @click="
        if(isOnline)$router.push(item.route);
      "
    >
      <v-list-tile-action>
        <v-icon>{{ item.icon }}</v-icon>
      </v-list-tile-action>

      <v-list-tile-content>
        <v-list-tile-title class="text-capitalize">{{ $t(item.title) }}</v-list-tile-title>
      </v-list-tile-content>
    </v-list-tile>
  </div>
</template>
<script>
import { VueOfflineMixin } from "vue-offline";

export default {
  mixins: [VueOfflineMixin],
  drawerItems: [
    {
      icon: "home",
      title: "homePage",
      onlineOnly: false,
      route: "/"
    },
    {
      icon: "timeline",
      title: "openMeasurement",
      onlineOnly: true,
      route: "/open"
    },
    {
      icon: "folder_shared",
      title: "sharedMeasurements",
      onlineOnly: true,
      route: "/shared"
    },
    {
      icon: "view_list",
      title: "myMeasurements",
      onlineOnly: true,
      route: "/my-measurements"
    },
    {
      icon: "settings",
      title: "codeGenerator",
      onlineOnly: true,
      route: "/generator"
    }
  ]
};
</script>
