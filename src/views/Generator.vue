<template>
  <v-layout column>
    <p class="display-2 text-capitalize font-weight-light mb-5">
      {{ $t("codeGenerator") }}
    </p>
    <code-generator />
    <!-- <meas-list/> -->
  </v-layout>
</template>
<script>
import CodeGenerator from "../components/CodeGenerator.vue";

export default {
  components: {
    CodeGenerator
  }
};
</script>
