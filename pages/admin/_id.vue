<template>
  <div class="pt-3">
    <v-row>
      <v-col>
        <h1 class="font-weight-medium">
          Dashboard
        </h1>
      </v-col>
      <v-col class="text-right caption text-capitalize green--text">
        Welcome Admin {{ this.$auth.user.name }}!
      </v-col>
    </v-row>
    <AdminBody />
  </div>
</template>
<script>
import { AdminBody } from '~/components/admin'

export default {
  middleware: ['auth-admin'],
  components: {
    AdminBody
  },
  data () {
    return {

    }
  }
}
</script>
