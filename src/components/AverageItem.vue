<template>
  <div class="average-item">
    <div class="row">
        <label>{{minutes}} minutes </label>
        <span><label>Best Time:</label> {{average.startTime}} - {{average.endTime}} minutes </span>
        <span><label>Average:</label> {{average.average}} per minute</span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AverageItem',

  props: {
    average: Object,
    minutes: Number
  }

}
</script>

<style scoped>
label {
    font-weight: bold;
}
</style>

