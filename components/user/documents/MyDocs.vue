<template>
  <div>
    <v-row>
      <v-col class="pt-3">
        <v-card>
          <v-data-table
            :headers="headers"
            :items="userdocs"
            :items-per-page="5"
            class="elevation-1"
            :loading="userdocs === null ? true : false"
            loading-text="Loading... Please wait"
          >
            <template v-slot:[`item.subject`]="{ item }">
              <span class="text-uppercase font-weight-bold">{{ item.subject }}</span>
            </template>
            <template v-slot:[`item.created_at`]="{ item }">
              <span class="caption">{{ $moment(item.created_at).format('L LT') }}</span>
            </template>
            <template v-slot:[`item.action`]="{ item }">
              <v-tooltip bottom color="primary">
                <template v-slot:activator="{ on, attrs }">
                  <v-btn
                    fab
                    text
                    small
                    v-bind="attrs"
                    @click="toggleRoute = !toggleRoute; itemDetails = item"
                    v-on="on"
                  >
                    <v-icon color="primary">
                      mdi-file-move-outline
                    </v-icon>
                  </v-btn>
                </template>
                <span class="caption">Route</span>
              </v-tooltip>
              <v-tooltip bottom color="blue accent-4">
                <template v-slot:activator="{ on, attrs }">
                  <v-btn
                    fab
                    text
                    small
                    v-bind="attrs"
                    @click="toggleEdit = !toggleEdit; itemDetails = item"
                    v-on="on"
                  >
                    <v-icon color="blue accent-4">
                      mdi-file-edit-outline
                    </v-icon>
                  </v-btn>
                </template>
                <span class="caption">Edit</span>
              </v-tooltip>
              <v-tooltip bottom color="red">
                <template v-slot:activator="{ on, attrs }">
                  <v-btn
                    fab
                    text
                    small
                    v-bind="attrs"
                    :loading="loader && item.id==index"
                    @click="deletedoc(item.id); loader = 'loading';index=item.id"
                    v-on="on"
                  >
                    <v-icon color="red">
                      mdi-file-remove-outline
                    </v-icon>
                  </v-btn>
                </template>
                <span class="caption">Delete</span>
              </v-tooltip>
            </template>
          </v-data-table>
        </v-card>
      </v-col>
    </v-row>
    <v-dialog v-model="toggleRoute" width="600">
      <Route :details="itemDetails" :offices="offices" @deleteItem="itemToDelete" @toggleRoute="cancel" />
    </v-dialog>
    <v-dialog v-model="toggleEdit" width="600">
      <Edit :details="itemDetails" @toggleEdit="cancelEdit" />
    </v-dialog>
  </div>
</template>

<script>
import { Route, Edit } from '~/components/user/documents'

export default {
  components: {
    Route,
    Edit
  },
  props: {
    offices: {
      type: Array,
      required: true
    }
  },
  data () {
    return {
      loading: true,
      loader: null,
      index: 0,
      deleteloading: false,
      toggleRoute: false,
      toggleEdit: false,
      itemDetails: [],
      headers: [
        {
          text: 'DOCUMENT #',
          value: 'control_id',
          align: 'start',
          width: '20%'
        },
        {
          text: 'SUBJECT',
          value: 'subject'
        },
        {
          text: 'DATE',
          value: 'created_at'
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
  computed: {
    userdocs () {
      return this.$store.state.documents.userdocs
    }
  },
  mounted () {
  },
  methods: {
    cancel (value) {
      this.toggleRoute = value
    },
    cancelEdit (value) {
      this.toggleEdit = value
    },
    itemToDelete (value) {
      const index = this.userdocs.findIndex(item => item.id === value)
      this.userdocs.splice(index, 1)
    },
    async deletedoc (id) {
      this.deleteloading = true
      try {
        await this.$documentsRepository.deletedoc(id).then((response) => {
          console.log('resposne -> ', response)
          this.deleteloading = false
          const notif = {
            display: true,
            type: 'primary',
            message: 'Successfully deleted..!'
          }
          this.loader = null
          this.$store.dispatch('addNotifications', notif)

          const index = this.userdocs.findIndex(item => item.id === id)
          this.userdocs.splice(index, 1)
        })
      } catch (error) {
        this.deleteloading = false
      }
    }

  }
}
</script>
