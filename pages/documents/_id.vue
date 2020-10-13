<template>
  <div class="pt-6">
    <v-row>
      <v-col>
        <h1 class="font-weight-medium">
          Documents
        </h1>
      </v-col>
      <v-col class="text-right">
        <v-btn
          class="text-capitalize white--text pa-6 ml-3"
          color="primary"
          rounded
          @click="toggleNew = !toggleNew"
        >
          <v-icon left>
            mdi-plus
          </v-icon>
          <span v-if="$vuetify.breakpoint.smAndUp" class="pr-2">
            New Document
          </span>
        </v-btn>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <v-tabs background-color="transparent">
          <v-tab class="text-capitalize">
            Incoming
          </v-tab>
          <v-tab class="text-capitalize">
            Outgoing
          </v-tab>
          <v-tab class="text-capitalize">
            Archived
          </v-tab>
          <v-tab-item>
            <Incoming :incoming="incoming" :loading="loading" :offices="offices" />
          </v-tab-item>
          <v-tab-item>
            <Outgoing :outgoing="outgoing" :outloading="outloading" />
          </v-tab-item>
          <v-tab-item>
            Archived
          </v-tab-item>
        </v-tabs>
      </v-col>
      <v-col>
        <v-tabs background-color="transparent">
          <v-tab class="text-capitalize">
            My Docs
          </v-tab>
          <v-tab class="text-capitalize">
            Watch
          </v-tab>
          <v-tab-item>
            <MyDocs :userdocs="userdocs" :offices="offices" />
          </v-tab-item>
          <v-tab-item>
            <Watch :userwatch="userwatch" :watchloading="watchloading" />
          </v-tab-item>
        </v-tabs>
      </v-col>
    </v-row>
    <v-dialog v-model="toggleNew" width="600">
      <NewDocument @toggleNewDoc="cancel" />
    </v-dialog>
  </div>
</template>
<script>
import { Incoming, MyDocs, NewDocument, Outgoing, Watch } from '~/components/user/documents'

export default {
  middleware: 'auth',
  components: {
    Incoming,
    Outgoing,
    MyDocs,
    NewDocument,
    Watch
  },
  data () {
    return {
      incoming: [],
      outgoing: [],
      userdocs: [],
      userwatch: [],
      offices: [],
      loading: true,
      outloading: true,
      watchloading: true,
      toggleNew: false
    }
  },
  created () {
    this.$store.dispatch('getDocs')
  },
  mounted () {
    this.getIncoming()
    this.getoffice()
    this.getOutgoing()
    this.getwatch()
  },
  methods: {
    async getIncoming () {
      try {
        await this.$documentsRepository.action(this.$auth.user.division_id).then((response) => {
          this.loading = false
          this.incoming = response.data
        })
      } catch (error) {
        this.loading = false
      }
    },
    async getoffice () {
      try {
        await this.$officeRepository.divisionbylevel(this.$auth.user.level_id).then((response) => {
          this.offices = response.divisions
          const index = this.offices.findIndex(item => item.id === this.$auth.user.division_id)
          this.offices.splice(index, 1)
        })
      } catch (error) {
      }
    },
    async getOutgoing () {
      try {
        await this.$documentsRepository.outgoing(this.$auth.user.division_id).then((response) => {
          this.outloading = false
          this.outgoing = response.data
        })
      } catch (error) {
        this.outloading = false
      }
    },
    async getwatch () {
      try {
        await this.$documentsRepository.getwatch(this.$auth.user.id).then((response) => {
          this.watchloading = false
          this.userwatch = response.data
        })
      } catch (error) {
        this.watchloading = false
      }
    },
    cancel (value) {
      this.toggleNew = value
    }
  }
}
</script>
