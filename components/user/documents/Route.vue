<template>
  <div>
    <v-card class="pb-3 px-6 pt-0">
      <v-row>
        <v-col cols="12" sm="8" class="d-flex">
          <v-icon medium color="green">
            mdi-file-document-edit
          </v-icon>
          <h4 class="green--text pl-3">
            {{ details.control_id }}
          </h4>
        </v-col>
        <v-col cols="12" sm="4" class="text-sm-right text-left py-sm-3 py-0">
          <h4 class="font-weight-light">
            {{ $moment(details.created_at).format('L LT') }}
          </h4>
        </v-col>
      </v-row>
      <v-divider color="green accent-4" />
      <v-row>
        <v-col class="body-2 text-uppercase font-weight-bold blue--text pb-0">
          {{ details.subject }}
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12" sm="9" class="caption text-capitalize py-0 text-truncate">
          a {{ details.classification }} document from <span class="text-uppercase">{{ details.sender }}</span>
        </v-col>
        <v-col cols="12" sm="3" class="caption py-0 text-sm-right text-left green--text">
          {{ details.type }}
        </v-col>
      </v-row>
      <v-row>
        <v-col class="py-0">
          <v-textarea
            v-model="remarks"
            rows="2"
            label="Remarks/Comments"
            color="green"
          />
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12" sm="6" class="py-0">
          <v-select
            v-model="actDesired"
            dense
            :items="listofActs"
            label="Action Desired"
            color="green"
          />
        </v-col>
        <v-col cols="12" sm="6" class="py-0">
          <v-select
            v-model="modeAction"
            dense
            label="Mode of Action"
            color="green"
            :items="modeOfAction"
          />
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12" sm="6" class="py-0">
          <v-select
            v-model="routeTo"
            dense
            label="Route to"
            color="green"
            item-value="id"
            item-text="name"
            :items="offices"
          />
        </v-col>
        <v-col cols="12" sm="6" class="py-0 text-right">
          <v-btn
            text
            class="text-capitalize"
            @click="cancelRoute"
          >
            <v-icon left small>
              mdi-cancel
            </v-icon>
            Cancel
          </v-btn>
          <v-btn
            color="green accent-4"
            class="text-capitalize white--text"
            :disabled="routeTo == ''"
            :loading="loading"
            @click="submit"
          >
            <v-icon left small>
              mdi-file-move
            </v-icon>
            Send
          </v-btn>
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
      actDesired: '',
      modeAction: '',
      routeTo: '',
      loading: false,
      listofActs: [
        'Information & Record',
        'Review/Evaluation',
        'Reference/Guidance',
        'Strict Compliance',
        'Dissemination',
        'Immediate Appropriate Action',
        'Inspection/Investigation',
        'Discussion'
      ],
      modeOfAction: [
        'Routinary',
        'Priority',
        'Confidential',
        'Urgent/Rush'
      ]
    }
  },
  methods: {
    cancelRoute () {
      this.$emit('toggleRoute', false)
    },
    async submit () {
      this.loading = true
      const divID = this.$auth.user.division_id !== null ? 1 : 0
      const data = {
        document_id: this.details.id,
        user_id: this.$auth.user.id,
        office_id: this.$auth.user.division_id,
        is_division: divID,
        action_office: this.routeTo,
        action_desired: this.actDesired,
        arrival: moment().format('YYYY-MM-DD HH:mm:ss'),
        action_mode: this.modeAction,
        status: 'On Process',
        remarks: this.remarks
      }
      try {
        await this.$documentsRepository.route(data).then((response) => {
          this.$documentsRepository.isroute(this.details.id)
          this.$emit('deleteItem', this.details.id)
          const notif = {
            display: true,
            type: 'primary',
            message: 'Document successfully submitted..'
          }
          this.$store.dispatch('addNotifications', notif)
          this.$documentsRepository.log(data)
          this.loading = false
          this.$emit('toggleRoute', false)
        })
      } catch (error) {
        const notif = {
          display: true,
          type: 'error',
          message: 'Something wrong with the document.'
        }
        this.$store.dispatch('addNotifications', notif)
        this.loading = false
      }
    }
  }
}
</script>
