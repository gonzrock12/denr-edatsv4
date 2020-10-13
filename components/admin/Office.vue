<template>
  <div>
    <v-card>
      <v-card-title class="green--text">
        <v-row>
          <v-col cols="8" class="d-flex py-0">
            <v-icon large color="green">
              mdi-home-analytics
            </v-icon>
            <h5 class="pl-3 pt-1">
              Office
            </h5>
          </v-col>
          <v-col cols="4" class="py-0 text-right">
            <v-btn icon @click="dialog=true">
              <v-icon color="green">
                mdi-plus-circle
              </v-icon>
            </v-btn>
          </v-col>
        </v-row>
      </v-card-title>
      <v-divider />
      <v-row>
        <v-col class="py-0">
          <v-card-text>Total</v-card-text>
        </v-col>
      </v-row>
    </v-card>
    <v-dialog v-model="dialog" width="400">
      <AddOffice :levels="levels" @toggleOffice="office" />
    </v-dialog>
  </div>
</template>

<script>
import { AddOffice } from '~/components/admin'

export default {
  components: {
    AddOffice
  },
  props: {
    levels: {
      type: Array,
      required: true
    }
  },
  data () {
    return {
      dialog: false
      // levels: []
    }
  },
  /* mounted () {
    this.getlevel()
  }, */
  methods: {
    /* async getlevel () {
      try {
        await this.$officeRepository.levels().then((response) => {
          this.levels = response
        })
      } catch (error) {
      }
    }, */
    office (value) {
      this.dialog = value
    }
  }
}
</script>
