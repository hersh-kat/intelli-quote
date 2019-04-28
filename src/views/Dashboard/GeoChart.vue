<template>
  <div class="card">
    <div class="card-header border-0">
      <div class="row align-items-center">
        <div class="col">
          <h6 class="text-uppercase text-muted ls-1 mb-1">Location</h6>
          <h3 class="mb-0">Global Following</h3>
        </div>
      </div>
    </div>

    <div class="table-responsive">
      <GChart
          type="GeoChart"
          :data="chartData"
          :options="chartOptions"
          />

    </div>

  </div>
</template>
<script>
import { GChart } from 'vue-google-charts';

  export default {
    name: 'g-chart',
    components: {
      GChart
    },
    props: ['chartData', 'chartOptions'],
    data() {
      return {

      }
    }

  }
</script>
<style>
</style>
