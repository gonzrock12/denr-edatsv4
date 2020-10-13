<template>
  <div>
    <v-app-bar
      fixed
      app
      flat
      color="primary"
      dark
    >
      <!--<v-btn
        icon
        @click.stop="miniVariant = !miniVariant"
      >
        <v-icon>mdi-{{ `chevron-${miniVariant ? 'right' : 'left'}` }}</v-icon>
      </v-btn>
      <v-btn
        icon
        @click.stop="clipped = !clipped"
      >
        <v-icon>mdi-application</v-icon>
      </v-btn>
      <v-btn
        icon
        @click.stop="fixed = !fixed"
      >
        <v-icon>mdi-minus</v-icon>
      </v-btn>
      <v-toolbar-title v-text="title" />-->
      <v-toolbar-title class="d-flex">
        <router-link :to="this.$auth.user ? this.$auth.user.is_admin ? '/admin' : '/user' : '/'">
          <v-img src="logopng.png" width="45" />
        </router-link>
        <span class="pt-2 pl-3 hidden-xs-only">Document Action Tracking System</span>
        <span class="pt-2 pl-3 hidden-sm-and-up">Caraga</span>
      </v-toolbar-title>
      <v-spacer />
      <v-btn
        v-if="this.$auth.user && !this.$auth.user.is_admin"
        color="white"
        class="hidden-sm-and-up"
        icon
        @click="showSearch = !showSearch"
      >
        <v-icon>mdi-magnify</v-icon>
      </v-btn>
      <v-text-field
        v-if="this.$auth.user && !this.$auth.user.is_admin"
        class="mt-6 hidden-xs-only mx-6"
        filled
        rounded
        dense
        placeholder="Keyword..."
        append-icon="mdi-magnify"
      />
      <v-btn
        v-if="!$auth.loggedIn"
        text
        rounded
        outlined
        :icon="$vuetify.breakpoint.xsOnly"
        :loading="loading"
        to="/login"
      >
        <span class="hidden-sm-and-up"><v-icon>mdi-login-variant</v-icon></span>
        <span class="hidden-xs-only">Login</span>
      </v-btn>
      <v-menu v-if="isLogin" bottom transition="scale-transition">
        <template v-slot:activator="{ on, attrs }">
          <v-btn
            icon
            v-bind="attrs"
            :loading="loading"
            v-on="on"
          >
            <v-avatar size="36">
              <img
                :src="$auth.user.profile_photo_url"
                :alt="$auth.user.name"
              >
            </v-avatar>
          </v-btn>
        </template>
        <v-list class="py-0">
          <v-list-item @click="logout">
            <v-list-item-icon class="mr-2">
              <v-icon>mdi-logout</v-icon>
            </v-list-item-icon>
            <v-list-item-content class="pr-2">
              <v-list-item-title>Logout</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </v-menu>
    </v-app-bar>
  </div>
</template>

<script>
export default {
  data () {
    return {
      loading: false,
      showSearch: false
    }
  },
  computed: {
    isLogin () {
      return this.$auth.user
    }
  },
  watch: {
    isLogin () {
      this.loading = false
    }
  },
  methods: {
    logout () {
      this.loading = true
      this.$auth.logout()
    }
  }
}
</script>
