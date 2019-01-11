<template>
    <div v-html='identicon'></div>
</template>
<script>
import jdenticon from "jdenticon";
export default {
  computed: {
    name: function() {
      return this.$store.state.user;
    },
    identicon: function() {
      return jdenticon.toSvg(name, 48);
    }
  }
};
</script>
