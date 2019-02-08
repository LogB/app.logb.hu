<i18n>
  {
    "en": {
      "unnamedMeas": "Unnamed Measurement",
      "noDescription": "No description",
      "by":"by",
      "null": "null",
      "viewMeas": "View",
      "sort": "Sort by",
      "date": "date",
      "sortById": "Sort by ID",
      "reverseSort":"Reverse sorting",
      "search": "Search"
      
    },
    "hu": {
      "unnamedMeas": "Névtelen mérés",
      "noDescription": "Nincs leírás",
      "by":"készítette:",
      "null": "null",
      "viewMeas": "Megtekintés",
      "sort": "Rendezés",
      "date": "dátum alapján",
      "sortById": "Rendezés azonosító alapján",
      "reverseSort":"Fordított rendezés",
      "search": "Keresés"
      
    }
  }
</i18n>
<template>
  <v-card>
    <v-progress-linear v-if="loading" indeterminate></v-progress-linear>
    <v-data-iterator
      :loading="loading"
      :items="measList"
      :rows-per-page-items="rowsNums"
      :pagination.sync="pagination"
      :search="search"
    >
      <v-layout slot="header" class="pl-3">
        <v-btn
          class="mt-3 mr-4"
          :disabled="!sortById"
          @click.stop="pagination.descending = !pagination.descending"
          >{{ $t("reverseSort") }}</v-btn
        >
        <v-switch v-model="sortById" :label="$t('sortById')"></v-switch>
        <v-text-field
          v-model="search"
          class="mr-4"
          append-icon="search"
          :label="$t('search')"
          single-line
          hide-details
        ></v-text-field>
      </v-layout>
      <v-expansion-panel slot="item" slot-scope="props">
        <div>
          <v-divider></v-divider>
        </div>
        <v-expansion-panel-content
          ripple
          class="mb-2"
          @input="loadMeta(props.item.measurement_id, $event)"
        >
          <div slot="header" class="pa-0">
            <div v-if="props.item.measurement_alias == null">
              <strong class="text-uppercase">{{
                props.item.measurement_id
              }}</strong>
              - {{ $t("unnamedMeas") }}
            </div>
            <div v-else>
              <strong class="text-uppercase">{{
                props.item.measurement_id
              }}</strong>
              - {{ props.item.measurement_alias }}
            </div>
            <div v-if="props.item.description_part == null">
              {{ $t("noDescription") }}&nbsp;-&nbsp;{{ $t("by") }}&nbsp;
              <strong>{{ props.item.username }}</strong>
            </div>
            <div v-else>
              {{ props.item.description_part }}&nbsp;-&nbsp;{{ $t("by") }}&nbsp;
              <strong>{{ props.item.username }}</strong>
            </div>
          </div>
          <div class="pa-2">
            <v-progress-linear
              v-if="innerLoading"
              indeterminate
            ></v-progress-linear>
            <v-card flat>
              <v-card-title>
                <v-flex>
                  <h4 v-if="props.item.measurement_alias == null">
                    {{ $t("unnamedMeas") }}
                  </h4>
                  <h4 v-else>{{ props.item.measurement_alias }}</h4>
                  <div
                    class="text-uppercase display-1 font-weight-light select_all"
                  >
                    {{ props.item.measurement_id }}
                  </div>
                </v-flex>
                <v-btn
                  class="ma-0"
                  color="primary"
                  @click="goTo(props.item.measurement_id)"
                  >{{ $t("viewMeas") }}</v-btn
                >
              </v-card-title>
              <v-divider></v-divider>
              <v-card class="pa-3 ma-2" style="width: wrap-content">
                <div v-for="(value, key) in props.item" :key="key">
                  <strong>{{ key }}:</strong>
                  <span v-if="value == null" class="align-end">{{
                    $t("null")
                  }}</span>
                  <span v-else class="align-end">{{ value }}</span>
                </div>
              </v-card>
            </v-card>
          </div>
        </v-expansion-panel-content>
      </v-expansion-panel>
    </v-data-iterator>
  </v-card>
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
      pagination: {},
      rowsNums: [
        5,
        10,
        20,
        50,
        100,
        { text: "$vuetify.dataIterator.rowsPerPageAll", value: -1 }
      ],
      measList: [],
      loading: false,
      innerLoading: false,
      sortById: false,
      search: ""
    };
  },
  watch: {
    sortById(val) {
      if (val) this.pagination.sortBy = "measurement_id";
      else this.pagination.sortBy = null;
    }
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
    loadMeta(id, event) {
      let index = this.measList.findIndex(x => x.measurement_id == id);
      if (event && !("start" in this.measList[index])) {
        this.innerLoading = true;
        api.measDetails(id).then(response => {
          stateMerge(this.measList[index], response.data.meta);
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
