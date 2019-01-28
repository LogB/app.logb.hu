<template>
  <v-layout column>
      <p class="display-2 text-capitalize font-weight-light ma-3 mb-5">{{$t('measurement')}} - <span class="text-uppercase font-weight-medium"> {{id}}</span></p>
      <view-meas :id="id"/>
  </v-layout>
</template>
<script>
import ViewMeas from "../components/ViewMeas.vue";
export default {
  components: {
    ViewMeas
  },
  computed:{
      id(){
        return this.$router.currentRoute.params.id;
      }
  }
};
</script>
