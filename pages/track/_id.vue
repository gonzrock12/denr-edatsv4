<template>
  <div>
    <v-container>
      <v-row>
        <v-col cols="10" class="text-uppercase font-weight-bold blue--text pb-0">
          {{ subject }}
        </v-col>
        <v-col class="text-right py-0">
          <v-btn icon @click="print">
            <v-icon>mdi-printer</v-icon>
          </v-btn>
        </v-col>
      </v-row>
      <v-row style="border-bottom: 1px solid #00800040">
        <v-col class="text-uppercase caption green--text py-0">
          {{ type }}
        </v-col>
        <v-col class="text-uppercase caption py-0 text-right">
          <v-btn to="/documents" text small>
            back
          </v-btn>
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <Chart :chartseries="chartseries" />
        </v-col>
        <v-col>
          <Track :track="track" :loading="trackloading" />
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import moment from 'moment'
import { Track, Chart } from '~/components'

export default {
  components: {
    Chart, // : () => import('@/components/Chart.vue'),
    Track
  },
  data () {
    return {
      track: [],
      subject: '',
      total_d: 0,
      total_hr: 0,
      total_min: 0,
      total_sec: 0,
      type: '',
      trackloading: true,
      chartseries: []
    }
  },
  mounted () {
    this.getTracks()
  },
  methods: {
    async getTracks () {
      try {
        await this.$documentsRepository.track(this.$route.params.id).then((response) => {
          this.subject = response.data[0].document.subject
          this.type = response.data[0].document.type
          this.track = response.data
          this.trackloading = false
          this.total_d = 0
          this.total_hr = 0
          this.total_min = 0
          this.total_sec = 0
          for (let index = 0; index < this.track.length; index++) {
            const isReceived = this.track[index].is_received === '' ? this.track[index].created_at : this.track[index].is_received
            const createdAt = this.track[index].created_at
            this.chartseries[index] = moment(createdAt).diff(moment(isReceived), 'seconds')
            this.track[index].duration = this.getDifference(createdAt, isReceived)
            this.getTotalDurations(this.track[index].duration)
          }
          this.$store.dispatch('addSeries', this.chartseries)
          this.track.total_durations = (this.total_d > 0 ? this.total_d + 'd ' : '') + (this.total_hr > 0 ? this.total_hr + 'hr ' : '') + (this.total_min > 0 ? this.total_min + 'min ' : '') + (this.total_sec > 0 ? this.total_sec + 'sec ' : '')
        })
      } catch (error) {
        this.trackloading = false
      }
    },
    getDifference (start, end) {
      const days = moment(start).diff(moment(end), 'days')
      const hours = moment(start).diff(moment(end), 'hours')
      const minutes = moment(start).diff(moment(end), 'minutes')
      const seconds = moment(start).diff(moment(end), 'seconds')
      return days <= 0 ? hours <= 0 ? minutes <= 0 ? seconds + ' sec' : minutes + ' min' : hours + ' hr' : days + ' d'
    },
    getTotalDurations (duration) {
      const time = duration.split(' ')
      if (time[1] === 'd') { this.total_d = this.total_d + parseInt(time[0]) } else if (time[1] === 'hr') { this.total_hr = this.total_hr + parseInt(time[0]) } else if (time[1] === 'min') { this.total_min = this.total_min + parseInt(time[0]) } else if (time[1] === 'sec') { this.total_sec = this.total_sec + parseInt(time[0]) }
    },
    print () {}
  }
}
</script>
