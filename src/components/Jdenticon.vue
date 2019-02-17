<template>
  <div v-html="identicon" />
</template>
<script>
import jdenticon from "jdenticon";

export default {
  computed: {
    identicon() {
      return jdenticon.toSvg(this.$store.state.user.name, 48);
    },
  }
};
</script>
