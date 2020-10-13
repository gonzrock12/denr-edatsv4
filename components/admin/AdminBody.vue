<template>
  <div>
    <v-row>
      <v-col cols="12" md="4">
        <Office :levels="levels" />
      </v-col>
      <v-col cols="12" md="4">
        <Documents />
      </v-col>
      <v-col cols="12" md="4">
        <Users :levels="levels" />
      </v-col>
    </v-row>
  </div>
</template>

<script>
import { Office, Documents, Users } from '~/components/admin'

export default {
  components: {
    Office,
    Documents,
    Users
  },
  data () {
    return {
      levels: []
    }
  },
  mounted () {
    this.getlevel()
  },
  methods: {
    async getlevel () {
      try {
        await this.$officeRepository.levels().then((response) => {
          this.levels = response
        })
      } catch (error) {
      }
    }
  }
}
</script>
