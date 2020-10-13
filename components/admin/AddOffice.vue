<template>
  <div>
    <v-card class="pb-6 px-6 pt-0">
      <h3 class="green--text pt-3 font-weight-regular">
        Office Details
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
              @change="changeLevel"
            />
          </v-col>
        </v-row>
        <v-row>
          <v-col class="py-0">
            <v-select
              v-model="service"
              color="green accent-4"
              dense
              label="Services"
              item-value="id"
              item-text="name"
              :items="services"
            />
          </v-col>
        </v-row>
        <v-row>
          <v-col class="py-0">
            <v-select
              v-model="category"
              color="green accent-4"
              dense
              label="Category"
              :items="categories"
              @change="changeCategory"
            />
          </v-col>
        </v-row>
        <v-row v-if="category === 'Section'">
          <v-col class="py-0">
            <v-select
              v-model="division"
              color="green accent-4"
              dense
              label="Division"
              item-value="id"
              item-text="name"
              :items="divisions"
            />
          </v-col>
        </v-row>
        <v-row>
          <v-col class="py-0">
            <v-text-field
              v-model="name"
              color="green accent-4"
              dense
              label="Name"
              :rules="[required('name')]"
            />
          </v-col>
        </v-row>
        <v-row>
          <v-col class="py-0">
            <v-text-field
              v-model="abbr"
              color="green accent-4"
              dense
              label="Abbrevation"
              :rules="[required('abbr'),maxLength('abbr',6)]"
            />
          </v-col>
        </v-row>
      </v-form>
      <v-card-actions class="justify-space-between">
        <v-btn text class="text-capitalize" @click="cancelOffice">
          <v-icon left small>
            mdi-cancel
          </v-icon>
          Cancel
        </v-btn>
        <v-btn
          color="primary"
          class="white--text px-4"
          rounded
          :disabled="!valid"
          :loading="loading"
          @click="submit"
        >
          <span class="font-weight-regular">Submit</span>
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
      level: '',
      service: '',
      services: [],
      category: '',
      categories: ['Division', 'Section'],
      name: '',
      abbr: '',
      division: '',
      divisions: [],
      valid: true,
      ...validations,
      loading: false
    }
  },
  methods: {
    async changeLevel () {
      this.services = []
      try {
        await this.$officeRepository.services(this.level).then((response) => {
          this.services = response.services
        })
      } catch (error) {
      }
    },
    cancelOffice () {
      this.$emit('toggleOffice', false)
    },
    async changeCategory () {
      this.divisions = []
      if (this.category === 'Section') {
        const data = {
          level_id: this.level,
          services_id: this.service
        }
        try {
          await this.$officeRepository.getdivisions(data).then((response) => {
            this.divisions = response.divisions
          })
        } catch (error) {
        }
      }
    },
    async submit () {
      this.loading = true
      const data = {
        level_id: this.level,
        services_id: this.service,
        division_id: this.division,
        name: this.name,
        abbr: this.abbr
      }
      if (this.category === 'Division') {
        try {
          await this.$officeRepository.division(data).then((response) => {
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
      } else if (this.category === 'Section') {
        try {
          await this.$officeRepository.section(data).then((response) => {
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
      } else {
        const notif = {
          display: true,
          type: 'error',
          message: 'Please select category!'
        }
        this.$store.dispatch('addNotifications', notif)
        this.loading = false
      }
    }
  }
}
</script>
