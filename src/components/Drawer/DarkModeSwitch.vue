<template>
  <v-switch class="pl-1" v-model="darkMode" :label="$t('darkMode')"></v-switch>
</template>
<script>
import {mapMutations} from "vuex";
export default {
  data() {
    return {
    };
  },
    methods:{
      ...mapMutations(["CHANGE_DARK"]),
  },
  computed:{
      darkMode: {
          get: function() {return this.$store.state.dark},
          set: function(value) {this.CHANGE_DARK(value)}
      }
  }
};
</script>

