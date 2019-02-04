<i18n>
  {
    "en": {
      "slogan": "View remotely, Analyze and Share Your LogB Measurements.",
      "learnMore": "Learn More",
      "whatIsLogB": "What is LogB?"
    },
    "hu": {
      "slogan": "Tekintsd meg távolról, elemezd és oszd meg LogB méréseid.",
      "learnMore": "Tudj meg többet",
      "whatIsLogB": "Mi az a LogB?"
    }
  }
</i18n>
<template>
  <v-layout align-center justify-center column>
    <h1 v-t="'slogan'" class="display-2 mb-5 center"></h1>
    <LoginReg class="mb-3"/>
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
