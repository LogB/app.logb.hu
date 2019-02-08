<template>
  <div v-html="identicon"></div>
</template>
<script>
import jdenticon from "jdenticon";
export default {
  computed: {
    identicon: function() {
      return jdenticon.toSvg(this.$store.state.user.name, 48);
    }
  }
};
</script>
