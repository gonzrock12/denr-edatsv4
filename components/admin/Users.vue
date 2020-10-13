<template>
  <div>
    <v-card>
      <v-card-title class="green--text">
        <v-row>
          <v-col cols="8" class="d-flex py-0">
            <v-icon large color="green">
              mdi-account-group
            </v-icon>
            <h5 class="pl-3 pt-1">
              Users
            </h5>
          </v-col>
          <v-col cols="4" class="py-0 text-right">
            <v-btn icon @click="registerDialog = true">
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
    <v-dialog v-model="registerDialog" width="380">
      <AddUser :levels="levels" @toggleRegisterCancel="registerCancel" />
    </v-dialog>
  </div>
</template>

<script>
import { AddUser } from '~/components/admin'

export default {
  components: {
    AddUser
  },
  props: {
    levels: {
      type: Array,
      required: true
    }
  },
  data () {
    return {
      registerDialog: false
    }
  },
  methods: {
    registerCancel (value) {
      this.registerDialog = value
    }
  }
}
</script>
