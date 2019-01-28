<template>
  <v-layout column>
      <p class="display-2 text-capitalize font-weight-light ma-3 mb-5">{{$t('sharedMeasurements')}}</p>
      <meas-list/>
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
