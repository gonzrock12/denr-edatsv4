<template>
  <div>
    <v-card class="pb-6 px-6 pt-0">
      <h3 class="green--text pt-6 font-weight-regular">
        User Details
      </h3>
      <v-divider />
      <v-form ref="form" v-model="valid">
        <v-row>
          <v-col class="pb-0">
            <v-select
              v-model="level"
              color="green accent-4"
              dense
              label="Level"
              item-value="id"
              item-text="name"
              :items="levels"
            />
          </v-col>
        </v-row>
        <v-row>
          <v-col class="py-0">
            <v-select
              v-model="category"
              dense
              color="green accent-4"
              label="Office Category"
              :items="categories"
              @change="changeCategory"
            />
          </v-col>
        </v-row>
        <v-row>
          <v-col class="py-0">
            <v-select
              v-model="office"
              dense
              color="green accent-4"
              label="Office Name"
              item-value="id"
              item-text="name"
              :items="offices"
              return-object
              @change="changeOffice"
            />
          </v-col>
        </v-row>
        <v-row>
          <v-col class="py-0">
            <v-text-field
              v-model="name"
              color="green accent-4"
              dense
              label="Full Name"
              :rules="[required('name')]"
            />
          </v-col>
        </v-row>
        <v-row>
          <v-col class="py-0">
            <v-text-field
              v-model="position"
              color="green accent-4"
              dense
              label="Positon/Designation"
              :rules="[required('position')]"
            />
          </v-col>
        </v-row>
        <v-row>
          <v-col class="py-0">
            <v-text-field
              v-model="username"
              color="green accent-4"
              dense
              :rules="[required('username')]"
              label="Username"
            />
          </v-col>
        </v-row>
        <v-row>
          <v-col class="py-0">
            <v-text-field
              v-model="password"
              color="green accent-4"
              dense
              label="Password"
              :rules="[required('password'), minLength('password',5)]"
              type="password"
            />
          </v-col>
        </v-row>
        <v-row>
          <v-col class="py-0">
            <v-text-field
              v-model="cpassword"
              color="green accent-4"
              dense
              label="Re-Type Password"
              :rules="[required('password'), password === cpassword || 'Password must match']"
              type="password"
            />
          </v-col>
        </v-row>
      </v-form>
      <v-card-actions class="justify-space-between">
        <v-btn class="text-capitalize" text @click="cancelRegister">
          <v-icon left small>
            mdi-cancel
          </v-icon>
          Cancel
        </v-btn>

        <v-btn
          class="px-4 white--text"
          color="green accent-4"
          :disabled="!valid"
          rounded
          :loading="loading"
          @click="registerIt"
        >
          <span class="font-weight-regular">Register</span>
        </v-btn>
      </v-card-actions>
    </v-card>
  </div>
</template>

<script>
import validations from '@/utils/validations'

export default {
  props: {
    levels: {
      type: Array,
      required: true
    }
  },
  data () {
    return {
      category: '',
      categories: ['Division', 'Section'],
      office: '',
      offices: [],
      level: '',
      name: '',
      position: '',
      username: '',
      password: '',
      cpassword: '',
      valid: true,
      loading: false,
      ...validations
    }
  },
  methods: {
    async changeCategory () {
      this.offices = []
      if (this.category === 'Division') {
        try {
          await this.$officeRepository.divisionbylevel(this.level).then((response) => {
            this.offices = response.divisions
          })
        } catch (error) {
        }
      } else if (this.category === 'Section') {
        try {
          await this.$officeRepository.sectionbylevel(this.level).then((response) => {
            this.offices = response.sections
          })
        } catch (error) {
        }
      }
    },
    cancelRegister () {
      this.$emit('toggleRegisterCancel', false)
    },
    changeOffice () {
      // console.log(this.office)
    },
    async registerIt () {
      let divId = 0
      let secId = 0
      this.loading = true
      if (this.category === 'Section') {
        divId = this.office.division_id
        secId = this.office.id
      } else if (this.category === 'Division') {
        divId = this.office.id
        secId = null
      }
      const data = {
        level_id: this.level,
        services_id: this.office.services_id,
        division_id: divId,
        section_id: secId,
        name: this.name,
        username: this.username,
        position: this.position,
        password: this.password
      }
      try {
        await this.$accountRepository.register(data).then((response) => {
          const notif = {
            display: true,
            type: 'primary',
            message: 'Successfully Added..!'
          }
          this.$store.dispatch('addNotifications', notif)
          this.$refs.form.reset()
          this.loading = false
        })
      } catch (error) {
        this.loading = false
      }
    }
  }
}
</script>
