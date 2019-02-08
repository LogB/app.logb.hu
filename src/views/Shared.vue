<template>
  <v-layout column>
    <p class="display-2 text-capitalize font-weight-light mb-5">
      {{ $t("sharedMeasurements") }}
    </p>
    <meas-list />
    <!-- <meas-list/> -->
  </v-layout>
</template>
<script>
import MeasList from "../components/MeasList.vue";

export default {
  components: {
    MeasList
  }
};
</script>
