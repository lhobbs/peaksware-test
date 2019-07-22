<template>
  <div class="path-map">

    <GmapMap 
    :center="center"
    :zoom="12"
    map-type-id="terrain"
    style="width: 1000px; height: 1000px"
    >
      <GmapMarker
          :position="start"
          :center="start"
          label="Start"
      />

      <GmapPolyline 
          v-if="path" 
          :path="path"
          :options="{ strokeColor:'#000000'}"
      />


      <GmapMarker
          :position="end"
          :center="end"
          label="End"
      />

        <GmapPolyline 
          v-if="selectedPath"
          :path="selectedPath"
          :options="{ strokeColor: '#00adef' }"
      />

    </GmapMap>

  </div>
</template>

<script>
export default {
  name: 'path-map',

  props: {
    selectedStart: Number,
    selectedEnd: Number
  },

  data() {
    return {
      path: [],
      start: {},
      end: {},
      center: {}
    }
  },

  methods: {
    /**
     * loads main path, start and end markers and center of map
     */
    loadData() {
    this.path = this.$services.getPath();
    this.start = this.path[0];
    this.end = this.path[this.path.length-1];
    this.center = this.path[this.path.length/2];
    }
  },

  computed: {
    /**
     * returns path of selected timeframe
     */
    selectedPath() {
      // convert time back to millisecond to grab path of timespan
      var millisecondsStart = this.selectedStart * 60 * 1000;
      var millisecondsEnd = this.selectedEnd * 60 * 1000
      return  this.selectedStart && this.selectedEnd ? this.$services.getPathForTime(millisecondsStart, millisecondsEnd) : []
    }
  },

  /*
  * on create of component, load data
  */
  created() {
    this.loadData();
  }
}
</script>
