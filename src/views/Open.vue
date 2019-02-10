<i18n>
{
  "en":{
    "openMeas": "Open measurement"
    },
  "hu":{ 
    "openMeas": "Mérés megnyitása"
    }
}
</i18n>
<template>
  <v-layout column>
    <p class="display-2 text-capitalize font-weight-light center">
      {{ $t("openMeas") }}
    </p>
    <open-meas />
  </v-layout>
</template>
<script>
import OpenMeas from "../components/OpenMeas.vue";
export default {
  components: {
    OpenMeas
  }
};
</script>
