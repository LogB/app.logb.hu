<template>
  <v-layout column>
    <p class="display-2 text-capitalize font-weight-light mb-5">
      {{ $t("measurement") }} -
      <v-tooltip bottom>
        <span
          slot="activator"
          v-clipboard="id"
          class="text-uppercase font-weight-medium select_none"
          style="cursor: pointer"
          >{{ id }}</span
        >
        {{ $t("clickToCopy") }}
      </v-tooltip>
    </p>
    <view-meas :id="id" />
    <div v-if="id == null">null</div>
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
      return this.$router.currentRoute.params.id.toLowerCase();
    }
  }
};
</script>
