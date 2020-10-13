<template>
  <div>
    <v-card>
      <v-card-title>
        Outgoing
        <v-spacer />
        <v-text-field
          v-model="search"
          class="pb-3"
          append-icon="mdi-magnify"
          label="Search..."
          single-line
          hide-details
        />
      </v-card-title>
      <v-data-table
        :headers="headers"
        :items="outgoing"
        :items-per-page="5"
        :search="search"
        :loading="outloading"
        loading-text="Loading... Please wait"
      >
        <template v-slot:[`item.created_at`]="{ item }">
          <span class="caption">{{ $moment(item.created_at).format('L LT') }}</span>
        </template>
      </v-data-table>
    </v-card>
  </div>
</template>

<script>
export default {
  props: {
    outgoing: {
      type: Array,
      required: true
    },
    outloading: {
      type: Boolean,
      required: true
    }
  },
  data () {
    return {
      search: '',
      headers: [
        {
          text: 'DOCUMENT #',
          value: 'document.control_id',
          align: 'start',
          width: '20%'
        },
        {
          text: 'SUBJECT',
          value: 'document.subject'
        },
        {
          text: 'DATE',
          value: 'created_at'
        },
        {
          text: 'TO',
          value: 'division.abbr',
          width: '15%'
        }
      ]
    }
  }
}
</script>
