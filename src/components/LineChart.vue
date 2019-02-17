<script>
import { Line } from "vue-chartjs";

export default {
  extends: Line,
  props: {
    items: Array,
    headers: Array,
    selectedColumns: Array
  },
  data() {
    return {
      chartData: {
        labels: [],
        datasets: []
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          xAxes: [
            {
              type: "time"
            }
          ],
          yAxes: [
            {
              ticks: {
                min: 0
              }
            }
          ]
        },
        animation: {
          duration: 0 // general animation time
        },
        hover: {
          animationDuration: 0 // duration of animations when hovering an item
        },
        responsiveAnimationDuration: 0 // animation duration after a resize
      }
    };
  },
  watch: {
    items: function() {
      for (let i = this.chartData.labels.length; i < this.items.length; i++) {
        let counter = 0;
        Object.keys(this.items[i]).forEach(data => {
          if (data != "Date") {
            this.chartData.datasets[counter].data.push(this.items[i]);
            counter++;
          } else {
            this.chartData.labels.push(this.items[i].Date);
          }
        });
        this.$data._chart.update();
      }
    },
    selectedColumns: function() {
      this.refreshColumns();
      this.$data._chart.update();
    }
  },
  mounted() {
    Object.values(this.headers).forEach(data => {
      //1. fill up with data
      if (data != "Date") {
        let dataSet = [];
        this.items.forEach(item => {
          dataSet.push(item[data]);
        });
        //2. Set other parameters
        let color = this.stringToColour(data);
        this.chartData.datasets.push({
          label: data,
          data: dataSet,
          hidden: true,
          fill: false,
          borderColor: color,
          backgroundColor: color,
          pointRadius: 3
        });
      } else {
        this.items.forEach(item => {
          this.chartData.labels.push(item.Date);
        });
      }
    });
    this.refreshColumns();
    this.renderChart(this.chartData, this.options);
  },
  methods: {
    refreshColumns() {
      if (this.selectedColumns) {
        let arr = this.headers.filter(word => word != "Date");
        this.selectedColumns.forEach(el => {
          this.chartData.datasets[arr.indexOf(el)].hidden = false;
        });
        let narr = arr.filter(word => !this.selectedColumns.includes(word));
        narr.forEach(el => {
          this.chartData.datasets[arr.indexOf(el)].hidden = true;
        });
      } else this.chartData.datasets.forEach(el => (el.hidden = true));
    },
    stringToColour(str) {
      var hash = 0;
      for (var i = 0; i < str.length; i++) {
        hash = str.charCodeAt(i) + ((hash << 5) - hash);
      }
      var colour = "#";
      for (i = 0; i < 3; i++) {
        var value = (hash >> (i * 8)) & 0xff;
        colour += ("00" + value.toString(16)).substr(-2);
      }
      return colour;
    }
  }
};
</script>
