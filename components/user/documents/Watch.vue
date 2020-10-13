<template>
  <div>
    <v-card>
      <v-data-table
        :headers="headers"
        :items="userwatch"
        :items-per-page="5"
        class="elevation-1"
        :loading="watchloading"
        loading-text="Loading... Please wait"
      >
        <template v-slot:[`item.action.actoffice.abbr`]="{ item }">
          <span class="caption">{{ item.action.actoffice.id === $auth.user.division_id ? 'In custody' : item.action.actoffice.abbr }}</span>
        </template>
        <template v-slot:[`item.actions`]="{ item }">
          <v-tooltip bottom color="blue accent-4">
            <template v-slot:activator="{ on, attrs }">
              <v-btn
                fab
                text
                small
                v-bind="attrs"
                :loading="watchloading && item.document_id==index"
                @click="track(item.action.document.id)"
                v-on="on"
              >
                <v-icon color="blue accent-4">
                  mdi-file-find
                </v-icon>
              </v-btn>
            </template>
            <span class="caption">Track</span>
          </v-tooltip>
          <v-tooltip bottom color="red accent-4">
            <template v-slot:activator="{ on, attrs }">
              <v-btn
                fab
                text
                small
                v-bind="attrs"
                :loading="deleteloading && item.id==index"
                @click="deletewatch(item.id); deleteloading = 'loading';index=item.id"
                v-on="on"
              >
                <v-icon color="red accent-4">
                  mdi-close
                </v-icon>
              </v-btn>
            </template>
            <span class="caption">Delete</span>
          </v-tooltip>
        </template>
      </v-data-table>
    </v-card>
  </div>
</template>

<script>
export default {
  props: {
    userwatch: {
      type: Array,
      required: true
    },
    watchloading: {
      type: Boolean,
      required: true
    }
  },
  data () {
    return {
      loading: true,
      deleteloading: null,
      index: 0,
      headers: [
        {
          text: 'SUBJECT',
          value: 'action.document.subject'
        },
        {
          text: 'LOCATION',
          value: 'action.actoffice.abbr',
          width: '20%'
        },
        {
          text: 'ACTION',
          value: 'actions',
          align: 'right',
          width: '20%'
        }
      ]
    }
  },
  methods: {
    async deletewatch (id) {
      try {
        await this.$documentsRepository.deletewatch(id).then((response) => {
          this.deleteloading = null
          const notif = {
            display: true,
            type: 'primary',
            message: 'Successfully deleted..!'
          }
          this.$store.dispatch('addNotifications', notif)
          const index = this.userwatch.findIndex(item => item.id === id)
          this.userwatch.splice(index, 1)
        })
      } catch (error) {
        this.deleteloading = null
      }
    },
    track (id) {
      this.$router.push('/track/' + id)
    }
  }
}
</script>
