<i18n>
  {
    "en": {
      "slogan": "View remotely, Analyze and Share Your LogB Measurements.",
      "learnMore": "Learn More",
      "unnamedMeas": "Unnamed Measurement",
      "noDescription": "No description",
      "by":"by"
    },
    "hu": {
      "slogan": "Tekintsd meg távolról, elemezd és oszd meg LogB méréseid.",
      "learnMore": "Tudj meg többet",
      "unnamedMeas": "Névtelen mérés",
      "noDescription": "Nincs leírás"
    }
  }
</i18n>
<template>
  <v-layout align-center justify-center column>
      <h2 v-if="loading" class="heading-1">Loading...</h2>
    <v-expansion-panel popout>
      <v-expansion-panel-content v-for="(item,i) in measList" :key="i">
        <div slot="header">
          <v-list>
            <v-list-tile>
              <v-list-tile-content>
                  <v-list-tile-title>{{item.measurement_alias}}</v-list-tile-title>
                  <v-list-tile-sub-title>{{item.description_part}}&nbsp;-&nbsp;{{$t('by')}}&nbsp;<strong>{{item.username}}</strong></v-list-tile-sub-title>
                  </v-list-tile-content>
            </v-list-tile>
          </v-list>
        </div>
      </v-expansion-panel-content>
    </v-expansion-panel>
    <v-btn @click="getData()" flat>get data</v-btn>
  </v-layout>
</template>
<script>
import api from "@/api.js";
export default {
  created() {
    this.getData();
  },
  data() {
    return {
      measList: null,
      loading: false,
    };
  },
  methods: {
    getData() {
        this.loading=true;
      api.fastListMeas().then(response => {
        this.measList = response.data;
        this.measList.forEach(element => {
          if (element.measurement_alias == null)
            element.measurement_alias = this.$t("unnamedMeas");
          if (element.description_part == null)
            element.description_part = this.$t("noDescription");
        });
        this.loading=false;
        console.log(this.measList);
      });
    }
  }
};
</script>





