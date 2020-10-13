<template>
  <div>
    <v-card>
      <v-card-title>
        Incoming
        <v-spacer />
        <v-text-field
          v-model="search"
          append-icon="mdi-magnify"
          label="Search"
          single-line
          hide-details
        />
      </v-card-title>
      <v-data-table
        :headers="headers"
        :items="incoming"
        :items-per-page="5"
        :search="search"
        :loading="loading"
        loading-text="Loading... Please wait"
      >
        <template v-slot:[`item.document.subject`]="{ item }">
          <span class="text-uppercase font-weight-bold">{{ item.document.subject }}</span>
        </template>
        <template v-slot:[`item.updated_at`]="{ item }">
          <span class="caption">{{ $moment(item.updated_at).format('L LT') }}</span>
        </template>
        <template v-slot:[`item.action`]="{ item }">
          <v-row>
            <v-col class="py-0">
              <v-btn
                color="primary"
                x-small
                :loading="loader && item.document_id==index"
                text
                :disabled="item.is_received !== null"
                @click="received(item); loader = 'loading';index=item.document_id"
              >
                {{ item.is_received !== null ? 'Received' : 'Click to receive' }}
                <span slot="loader">{{ item.is_received !== null ? 'Received' : 'processing...' }}</span>
              </v-btn>
            </v-col>
            <v-col class="py-0">
              <v-tooltip bottom color="blue accent-4">
                <template v-slot:activator="{ on, attrs }">
                  <v-btn
                    fab
                    text
                    small
                    v-bind="attrs"
                    :disabled="!item.is_received"
                    @click="details(item)"
                    v-on="on"
                  >
                    <v-icon color="blue accent-4">
                      mdi-file-document-outline
                    </v-icon>
                  </v-btn>
                </template>
                <span class="caption">Details</span>
              </v-tooltip>
              <v-tooltip bottom color="orange accent-4">
                <template v-slot:activator="{ on, attrs }">
                  <v-btn
                    fab
                    text
                    small
                    v-bind="attrs"
                    :disabled="!item.is_received"
                    :loading="watchloading && item.document_id==index"
                    @click="watch(item.id); watchloading = 'loading';index=item.document_id"
                    v-on="on"
                  >
                    <v-icon color="orange accent-4">
                      mdi-file-eye-outline
                    </v-icon>
                  </v-btn>
                </template>
                <span class="caption">Watch</span>
              </v-tooltip>
              <v-tooltip bottom color="primary">
                <template v-slot:activator="{ on, attrs }">
                  <v-btn
                    fab
                    text
                    small
                    v-bind="attrs"
                    :disabled="!item.is_received"
                    @click="toggleAction = !toggleAction; itemdetails = item"
                    v-on="on"
                  >
                    <v-icon color="primary">
                      mdi-file-document-edit
                    </v-icon>
                  </v-btn>
                </template>
                <span class="caption">Action</span>
              </v-tooltip>
            </v-col>
          </v-row>
        </template>
      </v-data-table>
    </v-card>
    <v-dialog v-model="toggleDetails" width="600">
      <Details :itemdetails="itemdetails" />
    </v-dialog>
    <v-dialog v-model="toggleAction" width="600">
      <Action :details="itemdetails" :offices="offices" @deleteItem="itemToDelete" @toggleAction="cancel" />
    </v-dialog>
  </div>
</template>
<script>
// import moment from 'moment'
import { Details, Action } from '~/components/user/documents'

export default {
  components: {
    Details,
    Action
  },
  props: {
    incoming: {
      type: Array,
      required: true
    },
    offices: {
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
      search: '',
      loader: null,
      index: 0,
      watchloading: null,
      toggleDetails: false,
      toggleAction: false,
      itemdetails: [],
      headers: [
        {
          text: 'SENDER',
          value: 'document.sender',
          align: 'start',
          width: '15%'
        },
        {
          text: 'SUBJECT',
          value: 'document.subject'
        },
        {
          text: 'DATE',
          value: 'updated_at'
        },
        {
          text: 'ACTION',
          value: 'action',
          align: 'right',
          width: '25%'
        }
      ]
    }
  },
  mounted () {
    // this.getIncoming()
  },
  methods: {
    async watch (id) {
      const data = {
        user_id: this.$auth.user.id,
        action_id: id
      }
      this.watchloading = true
      try {
        await this.$documentsRepository.watch(data).then((response) => {
          const mode = response.status === 'success' ? 'primary' : 'warning'
          const msg = response.status === 'success' ? 'Document added to watch' : 'This document is already in your watch'
          const notif = {
            display: true,
            type: mode,
            message: msg
          }
          this.watchloading = false
          this.$store.dispatch('addNotifications', notif)
        })
      } catch (error) {
        this.watchloading = false
      }
    },
    async received (data) {
      try {
        await this.$documentsRepository.received(data.document_id).then((response) => {
          data.is_received = response.received.is_received
          this.loader = null
        })
      } catch (error) {
      }
    },
    details (data) {
      this.itemdetails = data
      this.toggleDetails = true
    },
    cancel (value) {
      this.toggleAction = value
    },
    itemToDelete (value) {
      const index = this.incoming.findIndex(item => item.id === value)
      this.incoming.splice(index, 1)
    }
  }
}
</script>
