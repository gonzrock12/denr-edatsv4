<template>
  <div>
    <v-row>
      <v-col cols="3">
        <UserDocuments />
      </v-col>
      <v-col cols="3">
        <Reports />
      </v-col>
      <v-col cols="3">
        <Community />
      </v-col>
      <v-col cols="3">
        <Accounts />
      </v-col>
    </v-row>
  </div>
</template>

<script>
import { UserDocuments, Reports, Community, Accounts } from '~/components/user'

export default {
  components: {
    UserDocuments,
    Reports,
    Community,
    Accounts
  },
  data () {
    return {

    }
  }
}
</script>
