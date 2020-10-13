<template>
  <div class="pt-6">
    <v-row>
      <v-col>
        <h1 class="font-weight-medium">
          Dashboard
        </h1>
      </v-col>
      <v-col class="text-right caption text-capitalize">
        Welcome!! {{ this.$auth.user.name }}
      </v-col>
    </v-row>
    <UserDashboard />
  </div>
</template>
<script>
import { UserDashboard } from '~/components/user'

export default {
  middleware: 'auth',
  components: {
    UserDashboard
  },
  data () {
    return {

    }
  }
}
</script>
