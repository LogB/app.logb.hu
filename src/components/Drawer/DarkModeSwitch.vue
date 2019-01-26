<template>
  <v-switch v-model="darkMode" class="pl-1" :label="$t('darkMode')"></v-switch>
</template>
<script>
import { mapMutations } from "vuex";
export default {
  data() {
    return {};
  },
  computed: {
    darkMode: {
      get: function() {
        return this.$store.state.dark;
      },
      set: function(value) {
        this.CHANGE_DARK(value);
      }
    }
  },
  methods: {
    ...mapMutations(["CHANGE_DARK"])
  }
};
</script>
