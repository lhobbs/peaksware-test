<script>
import { Line } from 'vue-chartjs'

export default {
  name: 'line-chart',

  extends: Line,

  props: {
    chartData: Object
  },
 
  methods: {
    loadChart() {
      var _this = this;
      var options = {
        onClick: function(evt, data) {
          _this.selectPoint(data);
        }
      };
      this.renderChart(this.chartData, options)
    },
    /**
     * emit 'selectPoint' to parent to set timespan
     * @param {object} data     Selected point object of graph
     */
    selectPoint(data) {
      this.$emit('selectPoint', data[0]._index)
    }
  },
  mounted() {
    // make sure dom is loaded before rendering graph
    this.$nextTick(function() {
      this.loadChart();
    })
    
  },

  watch: {
    // when new data is generated, re-render graph
    chartData() {
      this.loadChart()
    }
  }
}
</script>

