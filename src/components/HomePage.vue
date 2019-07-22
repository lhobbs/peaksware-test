<template>
  <div class="home-page">
    <select v-model="selectedChannel" @change="setSelectedChannel()">
      <option v-for="channel in channelSet" :key="channel" :value="channel">{{channel}}</option>
    </select>

    <h2>Best {{selectedChannel}} averages:</h2>
    <average-item v-for="min in averagesMinutes" :key="min" :minutes="min" :average="getBestAverage(min)"></average-item>
    
    <div v-if="selectedStartTime || selectedEndTime">
      <h2>Start Time: {{selectedStartTime}} minutes</h2>
      <h2>End Time: {{selectedEndTime}} minutes</h2>
    </div>
    
    <line-chart :chartData="chartData" @selectPoint="selectPoint"></line-chart>
   
    <path-map :selectedStart="selectedStartTime" :selectedEnd="selectedEndTime"></path-map>
  </div>
</template>

<script>
import LineChart from './LineChart'
import PathMap from './PathMap'
import AverageItem from './AverageItem'

export default {
  name: 'HomePage',

  components: { AverageItem, PathMap, LineChart },

  data() {
    return {
      averagesMinutes: [1,5,10,15,20],
      events: [],
      channelSet: [],
      selectedChannel: 'power',
      chartData: {},
      selectedStartTime: null,
      selectedEndTime: null
    }
  },

  methods: {
    /**
     * returns the best average of the given value and time period
     * @param {number} minutes    Timespan to get "best" of
     */
    getBestAverage(minutes) {
      return this.$services.getBestAverage(minutes, this.selectedChannel)
    },
    
    /**
     * When new channel is selected, pull new chart data
     */
    setSelectedChannel() {
      this.chartData = this.$services.getChartData(this.selectedChannel);
    },
    /** 
     * Pulls all data when page loads
     */
    loadData() {
      this.channelSet = this.$services.getChannelSet();
      this.events = this.$services.getEvents();
      this.chartData = this.$services.getChartData(this.selectedChannel);
    },
    /**
     * Sets start/end time based on which graph points are selected
     * @param {number} index    Index of graph point selected
     */
    selectPoint(index) {
      var time = this.chartData.labels[index]
      // if start and end are already selected, start over
      if (this.selectedStartTime && this.selectedEndTime) {
        this.selectedStartTime = time;
        this.selectedEndTime = null;
      }
      // if start time isn't set or new point is before start, set start to new time
      else if (this.selectedStartTime == null || time < this.selectedStartTime) {
        this.selectedStartTime = time
      } 
      // otherwise, set end to new time
      else {
        this.selectedEndTime = time
      }
    }
  },

/**
 * on create of component, load data
 */
  created() {
    this.loadData();
  }
}
</script>
