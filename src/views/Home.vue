<i18n>
  {
    "en": {
      "cloudSlogan1": "View remotely, Analyze and Share Your",
      "cloudSlogan2": "Measurements.",
      "dontHave": "If you don't have a device to measure:",
      "generatorSlogan1": "Start with making your",
      "generatorSlogan2": "config and we will automatically generate the Arduino code for you.",
      "docs": "Documentation"
    },
    "hu": {
      "cloudSlogan1": "Tekintsd meg távolról, elemezd és oszd meg",
      "cloudSlogan2": " méréseid.",
      "dontHave": "Ha még nincs eszközöd:",
      "generatorSlogan1": "Rakd össze",
      "generatorSlogan2": "konfigurációdat, és mi megcsináljuk automatikusan az új Arduino-s mérőeszközöd programját.",
      "docs": "Dokumentáció"
    }
  }
</i18n>
<template>
  <v-layout align-center justify-center column class="select_none">
    <span class="logb_type select_none mb-3" style="font-size:800%">LogB</span>
    <v-card hover class="headline center my-2">
      <LoginReg/>
    </v-card>
    <v-card hover class="headline center my-2 pa-1">
      <v-card-title primary-title>
        <span class="logb_type select_none">LogB Cloud</span>
      </v-card-title>
      <v-card-text>
        {{ $t("cloudSlogan1") }}
        <span class="logb_type select_none">LogB</span>
        {{ $t("cloudSlogan2") }}
      </v-card-text>
      <v-btn :color="darkAccent" outline @click="$router.push('/shared')">
        <v-icon>folder_shared</v-icon>
        &nbsp;&nbsp;{{ $t("sharedMeasurements") }}
      </v-btn>

      <v-btn color="primary" @click="$router.push('/view')">
        <v-icon>timeline</v-icon>
        &nbsp;&nbsp;{{ $t("openMeasurement") }}
      </v-btn>
      <v-btn :color="darkAccent" outline @click="$router.push('/my-measurements')">
        <v-icon>view_list</v-icon>
        &nbsp;&nbsp;{{ $t("myMeasurements") }}
      </v-btn>
    </v-card>
    <v-card hover class="headline center my-2 pa-1">
      <v-card-title primary-title>
        <span class="logb_type">LogB</span>
        &nbsp;
        {{ $t("codeGenerator") }}
      </v-card-title>
      <v-card-text>
        {{ $t("dontHave") }}
        <br>
        {{ $t("generatorSlogan1") }}
        <span class="logb_type">LogB</span>
        {{ $t("generatorSlogan2") }}
      </v-card-text>
      <v-btn color="primary" @click="$router.push('/generator')">
        <v-icon>settings</v-icon>
        &nbsp;&nbsp;{{ $t("codeGenerator") }}
      </v-btn>
    </v-card>
    <v-card
      hover
      class="headline center my-2 pa-1"
      target="_blank"
      rel="noopener noreferrer"
      href="https://logb.hu"
    >
      <v-card-title primary-title>
        <span class="select_none">
          {{ $t('docs') }}:
          <v-btn target="_blank" rel="noopener noreferrer" href="https://logb.hu" color="primary">
            <v-icon>open_in_new</v-icon>&nbsp;&nbsp;
            LogB.hu
          </v-btn>
        </span>
      </v-card-title>
    </v-card>
    <!-- <v-btn
      v-t="'learnMore'"
      flat
    />-->
  </v-layout>
</template>
<script>
import LoginReg from "../components/Drawer/UserAlter.vue";

export default {
  components: {
    LoginReg
  },
  computed: {
    darkAccent() {
      if (this.$store.state.dark) return "accent";
      return "primary";
    }
  }
};
</script>
