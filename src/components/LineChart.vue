<i18n>
{
  "en":{
    "clickToShow": "Click on the label(s) to show data"
    },
  "hu":{
    "clickToShow": "Kattintson a jelmagyarázat(ok)ra az adatok megjelenítéséhez"
    }
}
</i18n>
<script>
import { Line, mixins } from "vue-chartjs";
import "chartjs-plugin-zoom";
import "chartjs-plugin-responsive-downsample";

const { reactiveData } = mixins;

export default {
  extends: Line,
  mixins: [reactiveData],
  props: {
    items: Array,
    headers: Array
  },
  data() {
    return {
      cols: [],
      chartData: {
        datasets: []
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        responsiveDownsample: {
          enabled: true,
          aggregationAlgorithm: "LTTB",
          desiredDataPointDistance: 100,
          minNumPoints: 60,
          cullData: true
        },
        pan: {
          enabled: true
        },
        zoom: {
          enabled: true,
          mode: "x"
        },
        scales: {
          xAxes: [
            {
              type: "time",
              time: {
                displayFormats: {
                  second: "HH:mm:ss",
                  minute: "HH:mm:ss",
                  millisecond: "HH:mm:ss"
                }
              }
            }
          ],
          yAxes: [
            {
              ticks: {
                beginAtZero: true
              }
            }
          ]
        },
        elements: {
          line: {
            fill: false,
            pointHitRadius: 10,
            cubicInterpolationMode: "monotone"
          }
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
      for (
        let row = this.chartData.datasets[0].data.length;
        row < this.items.length;
        row++
      ) {
        for (let col of this.cols) {
          this.chartData.datasets[this.cols.indexOf(col)].originalData.push({
            x: this.items[row].Date,
            y: this.items[row][col]
          });
        }
      }
      this.$data._chart.update();
      // let counter = 0;
      // this.chartData.datasets.forEach(set => {
      //   for (
      //     let row = this.chartData.datasets[0].data.length;
      //     row < this.items.length;
      //     row++
      //   ) {
      //     set.data.push({
      //       x: this.items[row].Date,
      //       y: this.items[row][this.cols[counter]]
      //     });
      //   }
      //   counter++;
      // });

      // this.cols.forEach(val => {
      //   for (
      //     let row = this.chartData.datasets[0].data.length;
      //     row < this.items.length;
      //     row++
      //   ) {
      //     this.chartData.datasets[this.cols.indexOf(val)].data.push({
      //       x: this.items[row].Date,
      //       y: this.items[row][val]
      //     });
      //   }
      // });
    }
  },
  mounted() {
    this.cols = this.headers.filter(val => val != "Date");
    this.cols.forEach(col => {
      let data = [];
      this.items.forEach(row => {
        data.push({ x: row.Date, y: row[col] });
      });
      let color = this.stringToColour(col);
      this.chartData.datasets.push({
        label: col,
        originalData: data,
        borderColor: color,
        backgroundColor: color
      });
    });
    this.renderChart(this.chartData, this.options);
  },
  methods: {
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
