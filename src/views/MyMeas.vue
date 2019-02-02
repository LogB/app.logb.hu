<template>
  <v-layout column>
      <p v-if="$store.state.loggedIn==true" class="display-2 text-capitalize font-weight-light ma-3 mb-5">{{$t('myMeasurements')}}</p>
      <p v-if="$store.state.loggedIn==false" class="display-2 text-capitalize font-weight-light ma-3 mb-5">{{$t('logInOrRegister')}}</p>
      <meas-list v-if="$store.state.loggedIn==true" :shared="false"/>
      <login-reg v-if="$store.state.loggedIn==false"/>

  </v-layout>
</template>
<script>
import MeasList from "../components/MeasList.vue";
import LoginReg from "../components/Drawer/UserAlter.vue";
export default {
  components: {
    MeasList,
    LoginReg
  }
};
</script>
