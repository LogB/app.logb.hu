<i18n>
{
  "en":{
    "liveData":"LIVE",
    "timeInterval": "New data is requested every",
    "perSec": "second|seconds",
    "sec": "second|seconds",
    "setInterval": "Set Interval",
    "setIntervalText": "Here, you can set the time between the automatic data updates in seconds.",
    "ourEstimate": "Our estimate is calculated from the 2 intervals (in seconds) between the last 3 data rows.",
    "turnOnAuto": "Automatic time interval",
    "share": "share",
    "copied": "Copied:"
    },
  "hu":{ 
    "liveData":"ÉLŐ",
    "timeInterval": "Frissítés",
    "perSec": "másodpercenként",
    "sec": "másodperc",
    "setInterval": "Időköz beállítása",
    "setIntervalText": "Itt be tudod állítani az automatikus frissítések közötti időtartamot másodpercekben.",
    "ourEstimate": "Mi, az utolsó három sor közötti két időközből számítjuk ki automatikusan az időközt.",
    "turnOnAuto": "Automatikus frissítési időköz",
    "share": "megosztás",
    "copied": "Kimásolva:"
    }
}
</i18n>
<template>
  <div>
    <v-snackbar v-model="snackBar">
      {{ toastText }}
      <v-btn flat color="primary" @click.native="snackBar = false">
        <v-icon>close</v-icon>
      </v-btn>
    </v-snackbar>
    <v-dialog v-model="intervalDialog" width="fit-content">
      <v-card>
        <v-card-title class="headline text-capitalize" primary-title>{{
          $t("setInterval")
        }}</v-card-title>
        <v-card-text class="text-xs-center">
          {{ $t("setIntervalText") }}
          <br />
          {{ $t("ourEstimate") }}
          <br />
          <v-card class="elevation-5 mt-3">
            <v-card-text>
              <v-switch
                v-model="autoInterval"
                :label="$t('turnOnAuto')"
              ></v-switch>
              <div class="center mt-4">{{ $t("timeInterval") }}</div>
              <div class="center headline text-uppercase text-truncate">
                <span>{{ interval }} {{ $tc("perSec", interval) }}</span>
              </div>
              <v-slider
                v-model="interval"
                class="px-2"
                thumb-label
                always-dirty
                ticks
                min="1"
                max="30"
                @start="autoInterval = false"
              ></v-slider>
            </v-card-text>
          </v-card>
        </v-card-text>
      </v-card>
    </v-dialog>
    <v-bottom-sheet v-model="shareMenu">
      <v-card>
        <v-card-title class="display-1 text-capitalize">{{
          $t("share")
        }}</v-card-title>
        <v-divider></v-divider>
        <v-list dense>
          <v-list-tile
            @click="
              shareMenu = false;
              toastClip();
            "
          >
            <v-list-tile-action>
              <v-icon>link</v-icon>
            </v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title>
                Link: &nbsp;
                <strong>https://cloud.logb.hu/view/{{ id }}</strong>
                &nbsp;&nbsp;({{ $t("clickToCopy") }})
              </v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
        </v-list>
      </v-card>
    </v-bottom-sheet>
    <v-layout wrap class="mb-4 center">
      <v-card class="px-2 my-1 mr-2">
        <v-switch
          v-model="autoUpdate"
          :loading="liveIsOn"
          :label="$t('liveData')"
        ></v-switch>
      </v-card>
      <v-card
        hover
        class="px-3 py-4 ma-1 select_none"
        style="cursor: pointer"
        @click.stop="intervalDialog = true"
      >
        {{ $t("timeInterval") }}
        <strong>{{ interval }}</strong>
        {{ $tc("perSec", interval) }}
      </v-card>
      <v-btn
        class="my-1"
        style="height: inherit"
        @click.stop="shareMenu = true"
      >
        <v-icon class="my-2">share</v-icon>
        &nbsp;{{ $t("share") }}
      </v-btn>
    </v-layout>

    <v-expansion-panel v-model="panel" expand>
      <v-expansion-panel-content>
        <div slot="header">Data</div>
        <v-data-table
          :headers="headers"
          :items="items"
          :pagination.sync="pagination"
          item-key="Date"
          :loading="loading"
          :rows-per-page-items="rowsNums"
        >
          <template slot="headers" slot-scope="props">
            <tr>
              <th
                v-for="header in props.headers"
                :key="header.text"
                :class="[
                  'column sortable center pa-0',
                  pagination.descending ? 'desc' : 'asc',
                  header.value === pagination.sortBy ? 'active' : ''
                ]"
                @click="changeSort(header.value)"
              >
                <v-icon small>arrow_upward</v-icon>
                {{ header.text }}
              </th>
            </tr>
          </template>
          <template slot="items" slot-scope="props">
            <tr>
              <td
                v-for="data in props.item"
                :key="data.date"
                class="center pa-0"
              >
                {{ data }}
              </td>
            </tr>
          </template>
        </v-data-table>
      </v-expansion-panel-content>
    </v-expansion-panel>
  </div>
</template>
<script>
//import stateMerge from "vue-object-merge";
import api from "@/api.js";
export default {
  props: { id: String },
  data() {
    return {
      pagination: {
        descending: true,
        sortBy: "Date"
      },
      autoUpdate: false,
      autoInterval: true,
      interval: 5,
      rowsNums: [
        5,
        10,
        20,
        50,
        100,
        { text: "$vuetify.dataIterator.rowsPerPageAll", value: -1 }
      ],
      measData: [],
      loading: false,
      headers: [],
      intervalDialog: null,
      shareMenu: null,
      toastText: "",
      snackBar: false,
      panel: [true, false, false]
    };
  },
  computed: {
    items() {
      return this.measData;
    },
    autoIntervalSec() {
      if (this.measData[0] != null && this.measData[2] != null) {
        let length = this.measData.length - 1;
        let time0 = Date.parse(this.measData[length].Date);
        let time2 = Date.parse(this.measData[length - 2].Date);
        let interval = (time0 - time2) / 2;
        if (interval <= 0) return 1;
        return interval / 1000 - 0.5;
      } else return 5; //default value in seconds if autoInterval generation fails
    },
    liveIsOn() {
      if (this.autoUpdate) return "red";
      else return false;
    },
    showInterval() {
      if (this.autoInterval) return "auto";
      return this.interval;
    }
  },
  watch: {
    autoUpdate(val) {
      if (val) {
        this.updateAutointerval();
        this.updaterLoop = setInterval(() => {
          this.updateData();
          this.updateAutointerval();
        }, this.interval * 1000);
      } else clearInterval(this.updaterLoop);
    },
    autoInterval() {
      this.updateAutointerval();
    }
  },
  created() {
    this.setData(this.id);
  },
  methods: {
    updateAutointerval() {
      if (this.autoInterval) {
        this.interval = this.autoIntervalSec;
      }
    },
    setData(id) {
      this.loading = true;
      api.measData(id).then(response => {
        if (response.data.error == 20) {
          this.measData = response.data.data;
          this.loading = false;
          this.makeHeader(response.data.header);
          this.updateAutointerval();
        } else {
          if (response.data.error == 11) this.$router.replace("/view");
        }
      });
    },
    makeHeader(array) {
      array.forEach(element => {
        this.headers.push({
          text: element,
          value: element,
          sortable: true
        });
      });
    },
    changeSort(column) {
      if (this.pagination.sortBy === column) {
        this.pagination.descending = !this.pagination.descending;
      } else {
        this.pagination.sortBy = column;
        this.pagination.descending = false;
      }
    },
    updateData() {
      this.loading = true;
      api.measData(this.id, this.items.length + 1).then(response => {
        if (response.data.data != null) {
          response.data.data.forEach(element => {
            this.measData.push(element);
          });
        }
        this.loading = false;
      });
    },
    toastClip() {
      this.$clipboard("https://cloud.logb.hu/view/" + this.id);
      this.toastText =
        this.$t("copied") + " https://cloud.logb.hu/view/" + this.id;
      this.snackBar = true;
    }
  }
};
</script>
