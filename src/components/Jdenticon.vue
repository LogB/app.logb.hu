<template>
    <div v-html='identicon' :name='name'></div>
</template>
<script>
import jdenticon from "jdenticon";
export default {
  props: ["name"],
  computed: {
    identicon: function() {
      return jdenticon.toSvg(this.name, 48);
    }
  }
};
</script>
<style>
</style>
