<template>
  <div>
    <v-card class="pb-3 px-6 pt-0">
      <v-row>
        <v-col cols="12" sm="8" class="d-flex">
          <v-icon medium color="green">
            mdi-file-document-edit
          </v-icon>
          <h4 class="green--text pl-3">
            {{ details.document.control_id }}
          </h4>
        </v-col>
        <v-col cols="12" sm="4" class="text-sm-right text-left py-sm-3 py-0">
          <h4 class="font-weight-light">
            {{ $moment(details.updated_at).format('L LT') }}
          </h4>
        </v-col>
      </v-row>
      <v-divider color="green accent-4" />
      <v-row>
        <v-col class="body-2 text-uppercase font-weight-bold blue--text pb-0">
          {{ details.document.subject }}
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12" sm="9" class="caption text-capitalize py-0 text-truncate">
          a {{ details.document.classification }} document from {{ details.document.sender }}
        </v-col>
        <v-col cols="12" sm="3" class="caption py-0 text-sm-right text-left green--text">
          {{ details.action_mode }}
        </v-col>
      </v-row>
      <v-row>
        <v-col class="py-0">
          <v-textarea
            v-model="remarks"
            rows="3"
            label="Remarks/Comments"
            color="green"
          />
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12" sm="6" class="py-0">
          <v-select
            v-model="stat"
            dense
            :items="status"
            label="Status"
            color="green"
          />
        </v-col>
        <v-col cols="12" sm="6" class="py-0">
          <v-select
            v-model="routeTo"
            dense
            label="Route to"
            color="green"
            item-value="id"
            item-text="name"
            :items="offices"
            :disabled="stat === 'End Transaction'"
          />
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12" md="6" class="py-0">
          <v-file-input
            v-model="files"
            color="green accent-4"
            multiple
            clearable
            show-size
            class="pt-0 caption"
            label="Attachments"
            :disabled="stat === 'End Transaction'"
          />
        </v-col>
        <v-col cols="12" md="6" class="py-0 justify-space-between">
          <v-row>
            <v-col>
              <v-btn
                text
                class="text-capitalize"
                @click="cancelAction"
              >
                <v-icon left small>
                  mdi-cancel
                </v-icon>
                Cancel
              </v-btn>
            </v-col>
            <v-col>
              <v-btn
                color="green accent-4"
                class="text-capitalize white--text"
                :disabled="routeTo == '' && stat != 'End Transaction'"
                :loading="loading"
                @click="submit"
              >
                <v-icon left small>
                  mdi-file-move
                </v-icon>
                Submit
              </v-btn>
            </v-col>
          </v-row>
        </v-col>
      </v-row>
    </v-card>
  </div>
</template>

<script>
import moment from 'moment'

export default {
  props: {
    details: {
      type: Object,
      required: true
    },
    offices: {
      type: Array,
      required: true
    }
  },
  data () {
    return {
      remarks: '',
      stat: '',
      status: ['On Process', 'End Transaction'],
      routeTo: '',
      files: [],
      loading: false,
      form: new FormData()
    }
  },
  methods: {
    cancelAction () {
      this.$emit('toggleAction', false)
    },
    async submit () {
      this.loading = true
      const data = {
        document_id: this.details.document.id,
        user_id: this.$auth.user.id,
        office_id: this.$auth.user.division_id,
        action_office: this.stat === 'End Transaction' ? this.$auth.user.division_id : this.routeTo,
        arrival: moment().format('YYYY-MM-DD HH:mm:ss'),
        is_received: null,
        status: this.stat,
        remarks: this.remarks
      }
      console.log('data -> ', data)
      try {
        await this.$documentsRepository.actiondoc(data, this.details.document.id).then((response) => {
          data.is_received = this.details.is_received
          const notif = {
            display: true,
            type: 'primary',
            message: 'Document successfully submitted..'
          }
          this.$emit('deleteItem', this.details.id)
          console.log(data)
          this.$documentsRepository.log(data)
          this.$store.dispatch('addNotifications', notif)
          this.loading = false
          this.$emit('toggleAction', false)
        })
      } catch (error) {
        this.loading = false
        const notif = {
          display: true,
          type: 'error',
          message: 'Unable to send, please try again'
        }
        this.$store.dispatch('addNotifications', notif)
      }
    }
  }
}
</script>
