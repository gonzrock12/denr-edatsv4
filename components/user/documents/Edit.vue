<template>
  <div>
    <v-card class="pb-3 px-6 pt-0">
      <v-row>
        <v-col cols="12" sm="8" class="d-flex">
          <v-icon medium color="green">
            mdi-file-edit
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
        <v-col class="py-0 text-center">
          <v-radio-group
            v-model="classification"
            row
            dense
            small
            class="py-0 justify-center"
            :rules="[required('classification')]"
          >
            <v-radio color="green" class="caption" label="Simple" value="simple" />
            <v-radio color="green" label="Complex" value="complex" />
            <v-radio color="green" label="Highly Technical" value="h-technical" />
          </v-radio-group>
        </v-col>
      </v-row>
      <v-row>
        <v-col class="py-0">
          <v-textarea
            v-model="subject"
            rows="2"
            label="Subject"
            color="green"
          />
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12" sm="6" class="pb-0">
          <v-select
            v-model="doctype"
            color="green accent-4"
            dense
            label="Type of Document"
            :items="type"
            :rules="[required('type')]"
          />
        </v-col>
        <v-col cols="12" sm="6" class="pb-0">
          <v-text-field
            v-model="sender"
            color="green accent-4"
            dense
            label="Sender"
            :rules="[required('sender')]"
          />
        </v-col>
      </v-row>
      <v-card-actions class="justify-space-between">
        <v-btn text class="text-capitalize" @click="cancelEdit">
          <v-icon left small>
            mdi-cancel
          </v-icon>
          Cancel
        </v-btn>
        <v-btn
          color="green accent-4"
          class="text-capitalize white--text px-3 font-weight-regular"
          :disabled="!valid"
          rounded
          :loading="loading"
          @click="submit"
        >
          <v-icon left small>
            mdi-content-save
          </v-icon>
          Save
        </v-btn>
      </v-card-actions>
    </v-card>
  </div>
</template>

<script>
import validations from '@/utils/validations'

export default {
  props: {
    details: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      ...validations,
      valid: true,
      loading: false,
      // editedsubject: '',
      type: [
        'Memorandum',
        'Special Order',
        'Invitation',
        'Letter',
        'Endorsement',
        'Others'
      ]
    }
  },
  computed: {
    subject: {
      get () {
        return this.details.subject
      },
      set (value) {
        this.details.subject = value
      }
    },
    classification: {
      get () {
        return this.details.classification
      },
      set (value) {
        this.details.classification = value
      }
    },
    sender: {
      get () {
        return this.details.sender
      },
      set (value) {
        this.details.sender = value
      }
    },
    doctype: {
      get () {
        return this.details.type
      },
      set (value) {
        this.details.type = value
      }
    }
  },
  methods: {
    cancelEdit () {
      this.$emit('toggleEdit', false)
    },
    async submit () {
      const data = {
        subject: this.subject,
        type: this.doctype,
        classification: this.classification,
        sender: this.sender
      }
      this.loading = true
      try {
        await this.$documentsRepository.updatedoc(data, this.details.id).then((response) => {
          const notif = {
            display: true,
            type: 'primary',
            message: 'Document successfully updated..'
          }
          this.$store.dispatch('addNotifications', notif)
          this.loading = false
          this.$emit('toggleEdit', false)
        })
      } catch (error) {
        this.loading = false
        const notif = {
          display: true,
          type: 'error',
          message: 'Unable to update, please try again'
        }
        this.$store.dispatch('addNotifications', notif)
      }
    }
  }
}
</script>
