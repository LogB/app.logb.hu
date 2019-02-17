<template>
  <v-switch
    v-model="darkMode"
    class="pl-1 text-capitalize"
    :label="$t('darkMode')"
  />
</template>
<script>
import { mapMutations } from "vuex";

export default {
  data() {
    return {};
  },
  computed: {
    darkMode: {
      get() {
        return this.$store.state.dark;
      },
      set(value) {
        this.CHANGE_DARK(value);
      },
    }
  },
  methods: {
    ...mapMutations(["CHANGE_DARK"])
  }
};
</script>
