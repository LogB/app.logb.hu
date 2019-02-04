<i18n>
  {
    "en": {
      "unnamedMeas": "Unnamed Measurement",
      "noDescription": "No description",
      "by":"by",
      "null": "null",
      "viewMeas": "View"
    },
    "hu": {
      "unnamedMeas": "Névtelen mérés",
      "noDescription": "Nincs leírás",
      "by":"készítette:",
      "null": "null",
      "viewMeas": "Megtekintés"
    }
  }
</i18n>
<template>
  <div>
    <v-progress-linear v-if="loading" indeterminate></v-progress-linear>
    <v-expansion-panel popout>
      <v-expansion-panel-content
        v-for="(item,i) in measList"
        :key="item.measurement_id"
        ripple
        class="elevation-9"
        lazy
        @input="loadMeta(item.measurement_id,i,$event)"
      >
        <div slot="header" class="pa-0">
          <div v-if="item.measurement_alias==null"><strong class="text-uppercase">{{item.measurement_id}}</strong> - {{$t("unnamedMeas")}}</div>
          <div v-else><strong class="text-uppercase">{{item.measurement_id}}</strong> - {{item.measurement_alias}}</div>
          <div v-if="item.description_part==null">
            {{$t("noDescription")}}&nbsp;-&nbsp;{{$t('by')}}&nbsp;
            <strong>{{item.username}}</strong>
          </div>
          <div v-else>
            {{item.description_part}}&nbsp;-&nbsp;{{$t('by')}}&nbsp;
            <strong>{{item.username}}</strong>
          </div>
        </div>
        <div class="ma-4">
          <v-progress-linear v-if="innerLoading" indeterminate></v-progress-linear>
          <v-card>
            <v-card-title>
              <v-flex>
                <h4 v-if="item.measurement_alias==null">{{$t("unnamedMeas")}}</h4>
                <h4 v-else>{{item.measurement_alias}}</h4>
                <div class="text-uppercase display-1 font-weight-light select_all">{{item.measurement_id}}</div>
              </v-flex>
              <v-spacer></v-spacer>
              <v-btn
                class="ma-0"
                color="primary"
                @click="goTo(item.measurement_id)"
              >{{$t('viewMeas')}}</v-btn>
            </v-card-title>
            <v-divider></v-divider>
            <v-list dense>
              <v-list-tile v-for="(value,key) in item" :key="key">
                <v-list-tile-content>{{key}}:</v-list-tile-content>
                <v-list-tile-content v-if="value==null" class="align-end">{{$t("null")}}</v-list-tile-content>
                <v-list-tile-content v-else class="align-end">{{value}}</v-list-tile-content>
              </v-list-tile>
            </v-list>
          </v-card>
        </div>
      </v-expansion-panel-content>
    </v-expansion-panel>
  </div>
</template>
<script>
import stateMerge from "vue-object-merge";
import api from "@/api.js";
export default {
  props: {
    shared: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      pagination: {
        sortBy: "name"
      },
      measList: [],
      loading: false,
      innerLoading: false
    };
  },
  mounted() {
    this.getList();
  },
  methods: {
    getList() {
      this.loading = true;
      api.fastListMeas(this.shared).then(response => {
        this.measList = response.data;
        this.loading = false;
      });
    },
    loadMeta(id, i, event) {
      if (event && !("start" in this.measList[i])) {
        this.innerLoading = true;
        api.measDetails(id).then(response => {
          stateMerge(this.measList[i], response.data.meta);
          this.innerLoading = false;
        });
      }
    },
    goTo(id) {
      this.$router.push("/view/" + id);
    }
  }
};
</script>
