<template>
  <div>
    Chart
    <VueApexCharts width="380" type="donut" :options="options" :series="series" />
  </div>
</template>

<script>
export default {
  components: {
    VueApexCharts: () => import('vue-apexcharts')
  },
  props: {
    chartseries: {
      type: Array,
      required: true
    }
  },
  data () {
    return {
      options: {}
    }
  },
  computed: {
    series () {
      return this.$store.state.chart.series
    }
  }
}
</script>
