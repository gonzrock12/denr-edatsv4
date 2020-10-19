<template>
  <div>
    <v-data-table
      dense
      :headers="headers"
      :items="track"
      class="elevation-1"
      hide-default-footer
      :loading="loading"
      loading-text="Loading... Please wait"
    >
      <template v-slot:[`item.is_received`]="{ item }">
        <span class="caption">{{ item.is_received === '' ? $moment(item.created_at).format('L LT') : $moment(item.is_received).format('L LT') }}</span>
      </template>
      <template v-slot:[`item.created_at`]="{ item }">
        <span class="caption">{{ $moment(item.created_at).format('L LT') }}</span>
      </template>
      <template v-slot:body.append>
        <tr>
          <td colspan="5" class="font-italic caption">
            Total Durations: <span class="font-weight-bold">{{ track.total_durations }}</span>
          </td>
        </tr>
      </template>
    </v-data-table>
  </div>
</template>

<script>
export default {
  props: {
    track: {
      type: Array,
      required: true
    },
    loading: {
      type: Boolean,
      required: true
    }
  },
  data () {
    return {
      headers: [
        {
          text: 'ORIGIN',
          value: 'office.abbr',
          sortable: false
        },
        {
          text: 'RECEIVED',
          value: 'is_received',
          width: '20%',
          sortable: false
        },
        {
          text: 'DURATION',
          value: 'duration',
          width: '20%',
          sortable: false
        },
        {
          text: 'SUBMITTED',
          value: 'created_at',
          width: '20%',
          sortable: false
        },
        {
          text: 'TO',
          value: 'division.abbr',
          width: '20%',
          sortable: false
        }
      ]
    }
  }
}
</script>
