<template>
  <div>
    <v-card flat class="mt-3 pa-3 accent">
      <v-row class="mt-3">
        <v-col cols="12" md="4" sm="6" offset-sm="3" offset-md="4">
          <v-card-title class="justify-center primary--text ">
            Please login
          </v-card-title>
          <v-divider />
          <v-card-text class="pb-0">
            <v-form v-model="valid">
              <v-row>
                <v-col class="pb-0">
                  <v-text-field
                    v-model="username"
                    outlined
                    color="primary"
                    dense
                    label="Username"
                    append-icon="mdi-account"
                    :rules="[required('username')]"
                    @keyup.enter="login"
                  />
                </v-col>
              </v-row>
              <v-row>
                <v-col class="py-0">
                  <v-text-field
                    v-model="password"
                    outlined
                    color="primary"
                    dense
                    label="Password"
                    :type="showPassword ? 'text' : 'password'"
                    :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                    :rules="[required('password')]"
                    @keyup.enter="login"
                    @click:append="showPassword = !showPassword"
                  />
                </v-col>
              </v-row>
            </v-form>
          </v-card-text>
          <v-card-actions class="justify-space-between">
            <v-btn class="text-capitalize" to="/" text>
              <v-icon left small>
                mdi-cancel
              </v-icon>
              Cancel
            </v-btn>
            <v-btn
              class="text-capitalize white--text pr-3 mr-3"
              color="primary"
              rounded
              :loading="loading"
              :disabled="!valid"
              @click="login"
            >
              <v-icon left>
                mdi-login-variant
              </v-icon>
              Login
            </v-btn>
          </v-card-actions>
        </v-col>
      </v-row>
    </v-card>
  </div>
</template>

<script>
import validations from '@/utils/validations'

export default {
  data () {
    return {
      showPassword: false,
      username: '',
      password: '',
      ...validations,
      valid: true,
      loading: false
    }
  },
  methods: {
    async login () {
      const details = {
        username: this.username,
        password: this.password
      }
      this.loading = true
      try {
        await this.$auth.loginWith('local', {
          data: details
        })
        const notif = {
          display: true,
          type: 'primary',
          message: 'Thanks for signing in..'
        }
        this.$store.dispatch('addNotifications', notif)
        if (this.$auth.user.is_admin) {
          this.$router.push('/admin')
        } else {
          this.$router.push('/user')
        }
      } catch (error) {
        const notif = {
          display: true,
          type: 'error',
          message: 'There was an issue signing in. Please try again.'
        }
        this.$store.dispatch('addNotifications', notif)
        this.loading = false
      }
    }
  }
}
</script>
