<template>
  <div>
    <v-container>
      <v-row>
        <v-col class="text-uppercase font-weight-bold blue--text pb-0">
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
    Track,
    Chart
  },
  data () {
    return {
      track: [],
      subject: '',
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
          for (let index = 0; index < this.track.length; index++) {
            const isReceived = this.track[index].is_received === '' ? this.track[index].created_at : this.track[index].is_received
            const createdAt = this.track[index].created_at
            this.chartseries[index] = moment(createdAt).diff(moment(isReceived), 'seconds')
            this.track[index].duration = this.getDifference(createdAt, isReceived)
            // this.chartOptions.labels[index] = this.track[index].division.abbr
          }
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
    print () {}
  }
}
</script>
