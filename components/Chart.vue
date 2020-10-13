<template>
  <div>
    Chart
    <div id="chart">
      <ApexCharts
        type="donut"
        width="400"
        :options="chartOptions"
        :series="chartseries"
      />
    </div>
  </div>
</template>

<script>
import ApexCharts from 'vue-apexcharts'

export default {
  components: {
    ApexCharts
  },
  props: {
    chartseries: {
      type: Array,
      required: true
    }
  },
  data () {
    return {
      chartOptions: []
    }
  }
}
</script>
