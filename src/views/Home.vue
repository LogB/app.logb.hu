<i18n>
  {
    "en": {
      "slogan1": "View remotely, Analyze and Share Your",
      "slogan2": "Measurements.",
      "learnMore": "Learn More",
      "whatIsLogB": "What is LogB?"
    },
    "hu": {
      "slogan1": "Tekintsd meg távolról, elemezd és oszd meg",
      "slogan2": " méréseid.",
      "learnMore": "Tudj meg többet",
      "whatIsLogB": "Mi az a LogB?"
    }
  }
</i18n>
<template>
  <v-layout align-center justify-center column style="width: 100vw">
    <span style="font-size: 400%" class="logb_type mb-5">LogB Cloud</span>
    <h1 class="display-2 my-5 center">
      {{ $t("slogan1") }}
      <span class="logb_type select_none">LogB</span>
      {{ $t("slogan2") }}
    </h1>
    <LoginReg class="mb-3" />
    <v-btn v-t="'learnMore'" flat></v-btn>
    <v-btn v-t="'whatIsLogB'" flat></v-btn>
  </v-layout>
</template>
<script>
import LoginReg from "../components/Drawer/UserAlter.vue";
export default {
  components: {
    LoginReg
  }
};
</script>
