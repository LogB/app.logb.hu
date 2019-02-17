<template>
  <v-menu offset-y>
    <v-btn slot="activator">
      {{ $t("language") }}: {{ activeLocale }}
    </v-btn>
    <v-list>
      <v-list-tile
        v-for="lang in locales"
        :key="lang"
        @click="changeLocale(lang)"
      >
        <v-list-tile-title class="text-uppercase">
          {{ lang }}
        </v-list-tile-title>
      </v-list-tile>
    </v-list>
  </v-menu>
</template>

<script>
import { mapMutations } from "vuex";

export default {
  data() {
    return {
      locales: ["en", "hu"]
    };
  },
  computed: {
    activeLocale() {
      return this.$store.state.locale;
    }
  },
  watch: {
    activeLocale() {
      this.$i18n.locale = this.$store.state.locale;
    },
  },
  mounted() {
    this.$i18n.locale = this.$store.state.locale;
  },
  methods: {
    ...mapMutations(["CHANGE_LOCALE"]),
    changeLocale(lang) {
      this.CHANGE_LOCALE(lang);
    },
  }
};
</script>
