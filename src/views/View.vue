<template>
  <v-layout column>
    <p class="display-2 text-capitalize font-weight-light mb-5">
      {{ $t("measurement") }} -
      <span class="text-uppercase font-weight-medium select_all">
        {{ id }}</span
      >
    </p>
    <view-meas :id="id" />
  </v-layout>
</template>
<script>
import ViewMeas from "../components/ViewMeas.vue";
export default {
  components: {
    ViewMeas
  },
  computed: {
    id() {
      return this.$router.currentRoute.params.id;
    }
  }
};
</script>
