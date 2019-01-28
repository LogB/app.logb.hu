<i18n>
{
  "en":{"liveData":"Update data"},
  "hu":{"liveData":"Adatok frissítése"}
}
</i18n>
<template>
  <div>
    <v-progress-linear indeterminate v-if="loading"></v-progress-linear>
    <v-btn @click="updateData()">{{$t('liveData')}}</v-btn>
    <v-progress-circular indeterminate v-if="liveIsOn"></v-progress-circular>
    <v-data-table
      v-model="selected"
      :headers="headers"
      :items="items"
      :pagination.sync="pagination"
      select-all
      item-key="name"
      class="elevation-1"
    >
      <template slot="headers" slot-scope="props">
        <tr>
          <th
            v-for="header in props.headers"
            :key="header.text"
            :class="['column sortable pa-0', pagination.descending ? 'desc' : 'asc', header.value === pagination.sortBy ? 'active' : '']"
            @click="changeSort(header.value)"
          >
            <v-icon small>arrow_upward</v-icon>
            {{ header.text }}
          </th>
        </tr>
      </template>
      <template slot="items" slot-scope="props">
        <tr>
          <td class="center" v-for="data in props.item" :key="data.date">{{data}}</td>
        </tr>
      </template>
    </v-data-table>
  </div>
</template>
<script>
//import stateMerge from "vue-object-merge";
import api from "@/api.js";
export default {
  data() {
    return {
      pagination: {
        sortBy: "name"
      },
      liveIsOn: false,
      selected: [],
      measData: [],
      loading: false,
      headers: [],
      items: []
    };
  },
  props: ["id"],
  created() {
    this.setData(this.id);
  },
  methods: {
    setData(id) {
      this.loading = true;
      api.measData(id).then(response => {
        this.measData = response.data.data;
        this.loading = false;
        console.log(JSON.stringify(this.measData));
        this.makeHeader(response.data.header);
        this.items = this.measData;
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
      api.measData(this.id, this.items.length+1).then(response => {
        this.measData = response.data.data;
        console.log(this.measData);
        // this is not needed, in this case, we should reload the whole measurement: this.makeHeader(response.data.header);
        this.measData.forEach(element => {
          this.items.push(element);
        });
      });
    }
  }
};
</script>

