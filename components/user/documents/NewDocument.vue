<template>
  <div>
    <v-card class="pb-3 px-6 pt-0">
      <v-row>
        <v-col>
          <h3 class="green--text pt-3">
            Document Details
          </h3>
        </v-col>
        <v-col class="text-right pt-6">
          <h4 class="pt-1 pl-1 green--text">
            <v-icon>mdi-calendar-month</v-icon>  {{ date }}
          </h4>
        </v-col>
      </v-row>
      <v-divider color="green accent-4" />
      <v-form ref="form" v-model="valid">
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
          <v-col cols="12" sm="4" class="pb-0">
            <v-text-field
              v-model="control_number"
              color="green accent-4"
              dense
              label="Document #"
              :rules="[required('Document #')]"
            />
          </v-col>
          <v-col cols="12" sm="3" class="pb-0">
            <v-select
              v-model="suffix"
              color="green accent-4"
              dense
              label="suffix"
              :items="suff"
              @change="getControlNum"
            />
          </v-col>
          <v-col cols="12" sm="5" class="pb-0">
            <v-select
              v-model="doctype"
              color="green accent-4"
              dense
              label="Type of Document"
              :items="type"
              :rules="[required('type')]"
            />
          </v-col>
        </v-row>
        <v-row>
          <v-col class="py-0">
            <v-textarea
              v-model="subject"
              rows="2"
              filled
              color="green accent-4"
              label="Subject"
              :rules="[required('subject')]"
            />
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12" sm="6" class="py-0">
            <v-text-field
              v-model="sender"
              color="green accent-4"
              dense
              label="Sender"
              :rules="[required('sender')]"
            />
          </v-col>
          <v-col cols="12" sm="6" class="py-0">
            <v-file-input
              v-model="files"
              color="green accent-4"
              multiple
              clearable
              show-size
              class="pt-0 caption"
              label="Attachments"
            />
          </v-col>
        </v-row>
      </v-form>
      <v-card-actions class="justify-space-between">
        <v-btn text class="text-capitalize" @click="cancelNew">
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
import moment from 'moment'
import { mapGetters } from 'vuex'

export default {
  data () {
    return {
      ...validations,
      date: new Date().toISOString().substr(0, 10),
      classification: '',
      control_num: moment().format('YDhms'),
      control_number: moment().format('YDhms') + '-' + 'OT',
      suffix: '',
      suff: ['CO', 'LB', 'OA', 'RO', 'ADN', 'ADS', 'SDN', 'SDS', 'PDI', 'OT'],
      doctype: '',
      type: [
        'Memorandum',
        'Special Order',
        'Invitation',
        'Letter',
        'Endorsement',
        'Others'
      ],
      subject: '',
      sender: '',
      files: [],
      valid: true,
      loading: false
    }
  },
  computed: {
    ...mapGetters(['getNotifications'])
  },
  watch: {
    getNotifications () {
      if (this.getNotifications.type === 'error') {
        this.loading = false
      } else {
        this.loading = false
        this.$refs.form.reset()
        this.$emit('toggleNewDoc', false)
      }
    }
  },
  methods: {
    getControlNum () {
      this.control_number = this.control_num + '-' + this.suffix
    },
    cancelNew () {
      this.$emit('toggleNewDoc', false)
    },
    submit () {
      const newdoc = {
        user_id: this.$auth.user.id,
        control_id: this.control_number,
        subject: this.subject,
        type: this.doctype,
        classification: this.classification,
        sender: this.sender,
        form: this.form
      }
      this.loading = true

      this.$store.dispatch('addDocument', newdoc)
    }
  }
}
</script>
