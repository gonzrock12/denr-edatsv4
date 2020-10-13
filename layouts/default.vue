<template>
  <v-app id="app">
    <Header />
    <v-main class="accent px-6">
      <nuxt />
    </v-main>
    <Footer />
    <v-snackbar v-model="notification" top left :color="mscolor">
      {{ message }}
      <template v-slot:action="{ attrs }">
        <v-btn color="white" v-bind="attrs" icon @click="notification = false">
          <v-icon>
            {{
              mscolor == 'primary' ? 'mdi-check' : 'mdi-close'
            }}
          </v-icon>
        </v-btn>
      </template>
    </v-snackbar>
  </v-app>
</template>

<script>
import { mapGetters } from 'vuex'
import { Footer, Header } from '~/components'

export default {
  components: {
    Header,
    Footer
  },
  data () {
    return {
      notification: false,
      message: '',
      mscolor: ''
    }
  },
  computed: {
    ...mapGetters(['getNotifications'])
  },
  watch: {
    getNotifications () {
      this.notification = this.getNotifications.display
      this.message = this.getNotifications.message
      this.mscolor = this.getNotifications.type
    }
  }
}
</script>
