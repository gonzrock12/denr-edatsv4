const state = () => ({
  userdocs: []
})

const getters = {
  getUserDocs (state) {
    return state.userdocs
  }
}

const mutations = {
  userDocument (state, payload) {
    state.userdocs = payload
  },
  addDocument (state, payload) {
    state.userdocs.push(payload)
  }
}

const actions = {
  async getDocs (context) {
    try {
      await this.$documentsRepository.userdocs(this.$auth.user.id).then((response) => {
        const data = response.documents
        context.commit('userDocument', data)
      })
    } catch (error) {
    }
  },

  async addDocument (context, payload) {
    try {
      await this.$documentsRepository.newdoc(payload).then((response) => {
        const data = response.document
        const notif = {
          display: true,
          type: 'primary',
          message: 'Successfully Added..!'
        }
        context.commit('addDocument', data)
        context.dispatch('addNotifications', notif)
      })
    } catch (error) {
      const status = error.response.status
      let message = ''
      if (status === 401) {
        message = 'Control Number must be unique, please try again.'
      } else {
        message = 'Something went wrong, please try again.'
      }
      const notif = {
        display: true,
        type: 'error',
        message
      }
      context.dispatch('addNotifications', notif)
    }
  }
}

const documentsModule = {
  state,
  getters,
  mutations,
  actions
}

export default documentsModule
