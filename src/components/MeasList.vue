<i18n>
  {
    "en": {
      "unnamedMeas": "Unnamed Measurement",
      "noDescription": "No description",
      "by":"by",
      "null": "null",
      "sort": "Sort by",
      "date": "date",
      "sortById": "Sort by ID",
      "reverseSort":"Reverse sorting",
      "search": "Search...",
      "options": "Settings",
      "none": "none"

    },
    "hu": {
      "unnamedMeas": "Névtelen mérés",
      "noDescription": "Nincs leírás",
      "by":"készítette:",
      "null": "null",
      "sort": "Rendezés",
      "date": "dátum alapján",
      "sortById": "Rendezés azonosító alapján",
      "reverseSort":"Fordított rendezés",
      "search": "Keresés...",
      "options": "Beállítások",
      "none": "nincs"
    }
  }
</i18n>
<template>
  <v-card>
    <v-progress-linear
      v-if="loading"
      indeterminate
    />
    <v-data-iterator
      :loading="loading"
      :items="measList"
      :rows-per-page-items="rowsNums"
      :pagination.sync="pagination"
      :search="search"
    >
      <v-layout
        slot="header"
        wrap
        class="pl-3"
      >
        <v-text-field
          v-model="search"
          class="mr-4 mb-2"
          append-icon="search"
          :label="$t('search')"
          single-line
          hide-details
        />
        <v-list>
          <v-list-group
            :value="settings"
            no-action
            class="mt-2"
          >
            <v-list-tile slot="activator">
              <v-list-tile-title>{{ $t("options") }}</v-list-tile-title>
            </v-list-tile>
            <v-list-tile class="ma-0 pa-0">
              <v-checkbox
                v-model="sortById"
                :label="$t('sortById')"
              />
            </v-list-tile>
            <v-list-tile class="ma-0 pa-0">
              <v-checkbox
                v-if="sortById"
                v-model="pagination.descending"
                :label="$t('reverseSort')"
              />
            </v-list-tile>
          </v-list-group>
        </v-list>
      </v-layout>
      <v-expansion-panel
        slot="item"
        slot-scope="props"
      >
        <v-divider />
        <v-expansion-panel-content
          lazy
          ripple
          class="pa-0"
          @input="loadMeta(props.item.measurement_id, $event)"
        >
          <div slot="header">
            <div v-if="props.item.measurement_alias == null">
              <strong class="text-uppercase">{{ props.item.measurement_id }}</strong>
              - {{ $t("unnamedMeas") }}
            </div>
            <div v-else>
              <strong class="text-uppercase">{{ props.item.measurement_id }}</strong>
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
            />
            <v-card flat>
              <v-card-title>
                <v-flex>
                  <h4 v-if="props.item.measurement_alias == null">
                    {{ $t("unnamedMeas") }}
                  </h4>
                  <h4 v-else>
                    {{ props.item.measurement_alias }}
                  </h4>
                  <v-tooltip bottom>
                    <span
                      slot="activator"
                      v-clipboard="props.item.measurement_id"
                      style="cursor: pointer"
                      class="text-uppercase display-1 font-weight-light select_all"
                    >{{ props.item.measurement_id }}</span>
                    {{ $t("clickToCopy") }}
                  </v-tooltip>
                </v-flex>
                <v-btn
                  class="ma-0"
                  color="primary"
                  @click="goTo(props.item.measurement_id)"
                >
                  {{ $t("viewMeas") }}
                </v-btn>
              </v-card-title>
              <v-divider />
              <v-card
                class="pa-3 ma-2"
                width="fit-content"
              >
                <v-layout
                  column
                  wrap
                >
                  <div>
                    <span class="text-capitalize font-weight-medium">{{ $t("start") }}:</span>
                    &nbsp;
                    <span>{{ props.item.start != null ? props.item.start : $t("none") }}</span>
                  </div>
                  <div>
                    <span class="text-capitalize font-weight-medium">{{ $t("last") }}:</span>
                    &nbsp;
                    <span>{{ props.item.last != null ? props.item.last : $t("none") }}</span>
                  </div>
                  <div>
                    <span class="text-capitalize font-weight-medium">{{ $t("line_count") }}:</span>
                    &nbsp;
                    <span>{{ props.item.line_count != null ? props.item.line_count : $t("none") }}</span>
                  </div>
                  <div>
                    <span class="text-capitalize font-weight-medium">{{ $t("description") }}:</span>
                    &nbsp;
                    <span
                      class="text-truncate"
                    >{{ props.item.description != null ? props.item.description : $t("none") }}</span>
                  </div>
                </v-layout>
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
import api from "@/api";

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
        13,
        20,
        50,
        100,
        { text: "$vuetify.dataIterator.rowsPerPageAll", value: -1 }
      ],
      measList: [],
      loading: false,
      innerLoading: false,
      sortById: false,
      search: "",
      settings: false
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
      const index = this.measList.findIndex(x => x.measurement_id == id);
      if (event && !("start" in this.measList[index])) {
        this.innerLoading = true;
        api.measDetails(id).then(response => {
          stateMerge(this.measList[index], response.data.meta);
          this.innerLoading = false;
        });
      }
    },
    goTo(id) {
      this.$router.push(`/view/${id}`);
    }
  }
};
</script>
